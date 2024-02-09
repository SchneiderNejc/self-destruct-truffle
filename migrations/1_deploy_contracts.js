// Import artifacts
var Destruct = artifacts.require("./Destruct.sol");
var GLDToken = artifacts.require("./GLDToken.sol");
var GameNft = artifacts.require("./GameNft.sol");

// Fixed data structure
var contractNames = [];
var contractAddresses = [];

// Parameters setup
var initSupply = 10 ** 6; // One million (10^18 = convert wei to ether)
var gldToken = "0x9f1DEd9BC243cB2fec733d0E280aECb9f6dA6E2a";

// Accounts data
module.exports = async function (deployer, network) {
    let owner = (await web3.eth.getAccounts())[0];
    console.log("owner: ", owner);

    // Deploy contracts
    await deployer.deploy(GLDToken, initSupply).then(function () {
        contractNames.push("GLDToken");
        contractAddresses.push(GLDToken.address);
    });

    await deployer.deploy(GameNft).then(function () {
        contractNames.push("GameNft");
        contractAddresses.push(GameNft.address);
    });

    await deployer.deploy(Destruct, GLDToken.address).then(function () {
        contractNames.push("Destruct");
        contractAddresses.push(Destruct.address);
    });
