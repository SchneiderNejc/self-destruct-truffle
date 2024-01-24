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

    it("link required contracts", async () => {
        // initialize contracts
	    destruct = await Destruct.deployed();

        if (destruct.address != 0)
            console.log("contract address non zero");
        else
            console.log("contract address zero");
    });



    it("contract successfully deployed", async () => {
        await destruct.destroy(owner, { from: owner });

        //contract functions can't be called after it has been destroyed
        try{
            await destruct.destroy(owner, { from: owner });
            assert.fail();
        } catch (e) {
            assert(true);
        }

/*             function isContractAlive(address contractAddress) external view returns(bool) {
        uint256 codeSize;
        assembly {
                    codeSize:= extcodesize(contractAddress)
                }
                return codeSize > 0;
            } */
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