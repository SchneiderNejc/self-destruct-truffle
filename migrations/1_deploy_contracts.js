var Destruct = artifacts.require("./Destruct.sol");
var GLDToken = artifacts.require("./GLDToken.sol");
var GameNft = artifacts.require("./GameNft.sol");

var initSupply = 10^6;


async function getAccount(id) {

    let accounts = await web3.eth.getAccounts();
    return accounts[id];
}


module.exports = async function (deployer, network) {

        var owner = getAccount(0);

        console.log("attempting deploy");

        await deployer.deploy(Destruct).then(function () {
            console.log("Destruct contract was deployed at address: " + Destruct.address);
        });

        await deployer.deploy(GLDToken, initSupply).then(function () {
             console.log("GLDToken contract was deployed at address: " + GLDToken.address);
        });

        await deployer.deploy(GameNft).then(function () {
            console.log("GameNft contract was deployed at address: " + GameNft.address);
        });
};
