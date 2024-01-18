let Destruct = artifacts.require("./Destruct.sol");

contract("Self Destruct", async accounts => {


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




})