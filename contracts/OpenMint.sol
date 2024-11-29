// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract OpenMint is ERC1155, ERC1155Supply, ERC1155Holder {
    address payable public owner;
    uint256 private currentTokenId;

    event NftCreated(
        uint256 indexed tokenId,
        address owner,
        address creator,
        uint256 supply,
        uint256 supplyLeft,
        uint256 price,
        string indexed category
    );

    event NftPurchased(
        uint256 indexed tokenId,
        address owner,
        address creator,
        uint256 supplyLeft,
        uint256 price,
        string indexed category
    );

    struct Nft {
        uint256 tokenId;
        address payable owner;
        address payable creator;
        uint256 totalSupply;
        uint256 supplyLeft;
        uint256 price;
        string category;
    }

    mapping(uint256 => Nft) public idToNft;

    constructor() ERC1155("your_base_uri_here") {
        owner = payable(msg.sender);
    }

    function _update(
        address from, 
        address to, 
        uint256[] memory ids, 
        uint256[] memory values
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    function uri(uint256 _tokenId) public view override returns (string memory) {
        return idToNft[_tokenId].category;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Holder) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function createToken(
        uint256 _supply,
        uint256 _price,
        string memory _category
    ) external {
        require(_price > 0, "Price must be greater than zero");

        currentTokenId++;
        uint256 tokenId = currentTokenId;

        _mint(msg.sender, tokenId, _supply, "");
        idToNft[tokenId] = Nft(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            _supply,
            _supply,
            _price,
            _category
        );

        emit NftCreated(
            tokenId,
            address(this),
            msg.sender,
            _supply,
            _supply,
            _price,
            _category
        );

        // Set URI for all tokens at once if using a global URI
        // _setURI(_tokenUri); // If you're using a global URI for all tokens
    }

    function getTotalPrice(uint256 _tokenId) public view returns (uint256) {
        return idToNft[_tokenId].price;
    }

    function buyNft(uint256 _tokenId) external payable {
        Nft storage nftItem = idToNft[_tokenId];

        require(
            _tokenId > 0 && _tokenId <= currentTokenId,
            "Token doesn't exist"
        );
        require(msg.value == nftItem.price, "Incorrect price");
        require(nftItem.supplyLeft > 0, "Out of stock");

        uint256 fees = (nftItem.price * 2) / 100;
        uint256 creatorProfit = nftItem.price - fees;

        nftItem.supplyLeft--;
        nftItem.owner = payable(msg.sender);

        _safeTransferFrom(address(this), msg.sender, _tokenId, 1, "");

        owner.transfer(fees);
        nftItem.creator.transfer(creatorProfit);

        emit NftPurchased(
            _tokenId,
            msg.sender,
            nftItem.creator,
            nftItem.supplyLeft,
            nftItem.price,
            nftItem.category
        );
    }

    function unsoldItems() external view returns (Nft[] memory) {
        uint256 itemCount;
        for (uint256 i = 1; i <= currentTokenId; i++) {
            if (idToNft[i].supplyLeft > 0) {
                itemCount++;
            }
        }

        Nft[] memory unsoldNfts = new Nft[](itemCount);
        uint256 counter;
        for (uint256 i = 1; i <= currentTokenId; i++) {
            if (idToNft[i].supplyLeft > 0) {
                unsoldNfts[counter] = idToNft[i];
                counter++;
            }
        }
        return unsoldNfts;
    }

    function myPurchase() external view returns (Nft[] memory) {
        uint256 itemCount;
        for (uint256 i = 1; i <= currentTokenId; i++) {
            if (idToNft[i].owner == msg.sender) {
                itemCount++;
            }
        }

        Nft[] memory myPurchases = new Nft[](itemCount);
        uint256 counter;
        for (uint256 i = 1; i <= currentTokenId; i++) {
            if (idToNft[i].owner == msg.sender) {
                myPurchases[counter] = idToNft[i];
                counter++;
            }
        }
        return myPurchases;
    }

    function myListings() external view returns (Nft[] memory) {
        uint256 counter;
        uint256 itemCount;

        for (uint256 i = 1; i <= currentTokenId; i++) {
            if (idToNft[i].creator == msg.sender) {
                itemCount++;
            }
        }

        Nft[] memory listings = new Nft[](itemCount);
        for (uint256 i = 1; i <= currentTokenId; i++) {
            if (idToNft[i].creator == msg.sender) {
                listings[counter] = idToNft[i];
                counter++;
            }
        }
        return listings;
    }
}
