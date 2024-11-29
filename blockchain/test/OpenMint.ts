import { expect } from "chai";
import { ethers } from "hardhat";
import { OpenMint } from "../typechain-types"; 

describe("OpenMint Contract", function () {
  let openMint: OpenMint;
  let owner: any;
  let user: any;
  let creator: any;

  beforeEach(async function () {
    [owner, user, creator] = await ethers.getSigners();

    const OpenMintFactory = await ethers.getContractFactory("OpenMint");

    // Deploy the contract instance
    openMint = await OpenMintFactory.deploy();  // No need to call .deployed() explicitly
  });

  it("should deploy the contract and set the correct owner", async function () {
    expect(await openMint.owner()).to.equal(owner.address);
  });

  it("should create a token and emit NftCreated event", async function () {
    const tokenUri = "https://example.com/token/1";
    const supply = 100;
    const price = ethers.parseEther("0.1"); // ethers.utils is no longer necessary in v6, use ethers.parseEther directly
    const category = "Art";

    // Listen for the event
    await expect(
      openMint.connect(creator).createToken(supply, price, category)
    )
      .to.emit(openMint, "NftCreated")
      .withArgs(
        1, // TokenId (should be 1 since it's the first token)
        owner.address, // owner of the contract (this)
        creator.address, // creator address
        supply, // totalSupply
        supply, // supplyLeft (same initially)
        price, // price
        category // category
      );
  });

  it("should let a user buy an NFT", async function () {
    const tokenUri = "https://example.com/token/1";
    const supply = 100;
    const price = ethers.parseEther("0.1");
    const category = "Art";

    // Create the token
    await openMint.connect(creator).createToken(supply, price, category);

    // User buys the token
    await expect(
      openMint.connect(user).buyNft(1, { value: price })
    ).to.emit(openMint, "NftPurchased")
      .withArgs(
        1, 
        user.address,
        creator.address,
        99, // supplyLeft after purchase
        price, // price
        category // category
      );
  });

  it("should return unsold items", async function () {
    const tokenUri = "https://example.com/token/1";
    const supply = 100;
    const price = ethers.parseEther("0.1");
    const category = "Art";

    await openMint.connect(creator).createToken(supply, price, category);

    const unsoldItems = await openMint.unsoldItems();
    expect(unsoldItems.length).to.equal(1);
    expect(unsoldItems[0].category).to.equal(category);
  });

  it("should return the correct price for a token", async function () {
    const tokenUri = "https://example.com/token/1";
    const supply = 100;
    const price = ethers.parseEther("0.1");
    const category = "Art";

    await openMint.connect(creator).createToken(supply, price, category);

    const fetchedPrice = await openMint.getTotalPrice(1);
    expect(fetchedPrice).to.equal(price);
  });

  it("should allow a user to list their purchased NFTs", async function () {
    const tokenUri = "https://example.com/token/1";
    const supply = 100;
    const price = ethers.parseEther("0.1");
    const category = "Art";

    await openMint.connect(creator).createToken(supply, price, category);

    await openMint.connect(user).buyNft(1, { value: price });

    const myPurchases = await openMint.connect(user).myPurchase();
    expect(myPurchases.length).to.equal(1);
    expect(myPurchases[0].owner).to.equal(user.address);
  });
});
