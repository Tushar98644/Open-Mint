import { expect } from "chai";
import { ethers } from "hardhat"; 
import { BigNumberish } from "ethers";
import { parseEther, formatEther } from "ethers";

const fromEthertoWei = (num: number) => parseEther(num.toString());

const toEtherfromWei = (num: BigNumberish) => formatEther(num);

describe("Tests for OpenMint contract", () => {
    let openMint: any;
    let owner: any, addr1: any, addr2: any, addr3: any, addr4: any, addr5: any;

    beforeEach(async () => {
        const OpenMint = await ethers.getContractFactory("OpenMint");
        [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

        openMint = await OpenMint.deploy();
        // await openMint.deployed();
    });

    describe("Checks for token creation", () => {
        it("Should check for newly created tokens and their details", async () => {
            let amount = 2;
            await openMint.createToken("", 3, fromEthertoWei(amount), "music");
            const nft = await openMint.idToNft(1);

            console.log("Nft: ", nft);

            expect(nft.creator.toString()).to.equal(owner.address);
            expect(nft.totalSupply.toString()).to.equal("3");
            expect(nft.price.toString()).to.equal(fromEthertoWei(2).toString());
        });

        it("Should fail if a token is listed with 0 price", async () => {
            await expect(openMint.connect(addr1).createToken("", 2, 0, "art"))
                .to.be.revertedWith("Specify some amount for the token.");
        });
    });

    describe("Checks for purchasing the tokens", () => {
        const amount = 0.1;
        
        beforeEach(async () => {
            await openMint.connect(addr1).createToken("", 2, fromEthertoWei(amount), "art");
        });

        it("Should update the owner of the token to the address that calls the buyNft function", async () => {
            const price = await openMint.getTotalPrice(1);

            await openMint.connect(addr2).buyNft(1, { value: price });
            const nft = await openMint.idToNft(1);

            // The creator of the token is addr1 and after purchasing the token, its owner should be addr2
            expect(nft.creator.toString()).to.equal(addr1.address);
            expect(nft.owner.toString()).to.equal(addr2.address);
        });

        it("Should fail for all invalid token ids, sold tokens, and when not enough ether is paid", async () => {
            const price = await openMint.getTotalPrice(1);

            // addr2 tries to purchase token of Id 2 that doesn't exist.
            await expect(openMint.connect(addr2).buyNft(2, { value: price }))
                .to.be.revertedWith("Token Doesn't exist.");

            // addr2 tries to purchase token of Id 0 that doesn't exist.
            await expect(openMint.connect(addr2).buyNft(0, { value: price }))
                .to.be.revertedWith("Token Doesn't exist.");

            // addr2 tries to purchase token with less than required amount.
            await expect(openMint.connect(addr2).buyNft(1, { value: fromEthertoWei(0.01) }))
                .to.be.revertedWith("Not Enough Balance.");

            // addr2 purchases all tokens of Id 1.
            await openMint.connect(addr2).buyNft(1, { value: price });
            await openMint.connect(addr2).buyNft(1, { value: price });

            // addr3 tries to purchase tokens of Id 1 that is sold out.
            await expect(openMint.connect(addr3).buyNft(1, { value: price }))
                .to.be.revertedWith("Out of Stock.");
        });
    });

    describe("Checks unsold tokens, tokens created and listed by an address", () => {

        // Creates 5 tokens by different addresses before running each test
        beforeEach(async () => {
            await openMint.createToken("", 3, fromEthertoWei(0.2), "music");
            await openMint.connect(addr1).createToken("", 4, fromEthertoWei(0.3), "art");
            await openMint.connect(addr2).createToken("", 1, fromEthertoWei(0.4), "course");
            await openMint.connect(addr3).createToken("", 2, fromEthertoWei(0.1), "ticket");
            await openMint.connect(addr1).createToken("", 5, fromEthertoWei(0.22), "art");
        });

        it("Should return the correct length of the array that contains the unsold tokens", async () => {
            await openMint.connect(addr4).buyNft(3, { value: fromEthertoWei(0.4) });
            const unsold = await openMint.unsoldItems();
            expect(unsold.length).to.equal(4);
        });

        it("Should return the correct length of the token's array created by an address", async () => {
            const myCreation = await openMint.connect(addr1).myListings();
            expect(myCreation.length).to.equal(2);
        });

        it("Should return the correct length of the token's array owned by an address", async () => {
            await openMint.connect(addr4).buyNft(1, { value: fromEthertoWei(0.2) });
            await openMint.connect(addr4).buyNft(2, { value: fromEthertoWei(0.3) });
            await openMint.connect(addr4).buyNft(4, { value: fromEthertoWei(0.1) });

            const myCollection = await openMint.connect(addr4).myPurchase();
            expect(myCollection.length).to.equal(3);
        });
    });
});
