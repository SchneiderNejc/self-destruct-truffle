let Destruct = artifacts.require("./Destruct.sol");
let GLDToken = artifacts.require("./GLDToken.sol");
let GameNft = artifacts.require("./GameNft.sol");

contract("Self Destruct", async accounts => {

    // contracts
    let destruct;
    let token;
    let nft;

    // EOAs
    let owner = accounts[0];

    it("deploy required contracts", async () => {
//        if (destruct.address !== 'undefined')
        // initialize contracts
        token = await GLDToken.deployed();
        nft = await GameNft.deployed();
        destruct = await Destruct.deployed(token.address);

        // if any of the contracts is undeployed, reading its address will error out
        try {
            destruct.address !== 'undefined';
            token.address !== 'undefined';
            nft.address !== 'undefined';
            assert(true);
        } catch (e) {
            assert.fail();
        }
    });

    it("mint some nfts", async () => {

        let nftsBefore = parseInt(await nft.balanceOf(owner));
        let nftsToMint = 3;

        for(let i = 0; i < nftsToMint; i++){
            await nft.mint(owner);
        }

        let nftsAfter = parseInt(await nft.balanceOf(owner));

        assert.equal(nftsBefore + nftsToMint, nftsAfter, "insufficient mint amount.");

    });


    xit("contract can receive tokens and nfts", async () => {

        let tokensToSend = 1000;
        let nftsToSend = 1;

        for (let i = 0; i < nftsToSend; i++) {
            // may need to approve first. Do approveForAll above the loop.
            await nft.transfer(destruct.address, i+1); //id starts with 1?
        }

        await token.transfer(destruct.address, tokensTosend);

        destructTokenBalance = parseInt(await destruct.balanceOf(owner));
        destructNftsBalance = parseInt(await destruct.balanceOf(owner));
        //ownerNftBalance
        assert.equal(destructTokenBalance, tokensToSend, "insufficient mint amount.");
        assert.equal(destructTokenBalance, nftsToSend, "insufficient mint amount.");
    });

    it("destroy() deletes contract and refunds its balance", async () => {

        //check token owner balance
        //check nft owner balance

        await destruct.destroy(owner);

        //contract functions can't be called after it has been destroyed
        try {
            await destruct.destroy(owner);
            assert.fail();
        } catch (e) {
            assert(true);
        }

        //check token owner balance
        //check nft owner balance

        assert.equal();
    });

    xit("contract selfdestructs upon receiving treshold amount nfts", async () => {
        await destruct.destroy(owner);

        //contract functions can't be called after it has been destroyed
        try {
            await destruct.destroy(owner);
            assert.fail();
        } catch (e) {
            assert(true);
        }
    });

    xit("contract selfdestructs upon receiving treshold amount tokens", async () => {
        await destruct.destroy(owner);

        //contract functions can't be called after it has been destroyed
        try {
            await destruct.destroy(owner);
            assert.fail();
        } catch (e) {
            assert(true);
        }
    });

    // 0. contract successfuly selfdestructs
    // 1. owner is message sender
    // 2. erc 20 is transfered to Destruct
    // 3. erc 721 is transfered to Destruct
    // 4. only owner can call Destroy()
    // 5. both erc 20 and erc 721 are transfered to owner
    // ---------------------------
    // Make it so at certain amount of nfts contract is auto destructed
    // Make it so at certain amount of tokens auto destructed

    // Repeat in Truffle and Hardhat!
    // More to come, ChainLink, use box next




});