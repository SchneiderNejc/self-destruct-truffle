var Destruct = artifacts.require("./Destruct.sol");
var GLDToken = artifacts.require("./GLDToken.sol");
var GameNft = artifacts.require("./GameNft.sol");

var initSupply = 10**6 * 10**18; //one million (10^18 = convert wei to ether)


async function getAccount(id) {

    let accounts = await web3.eth.getAccounts();
    return accounts[id];
}


module.exports = async function (deployer, network) {

        var owner = getAccount(0);


        await deployer.deploy(GLDToken, initSupply).then(function () {
             console.log("GLDToken contract was deployed at address: " + GLDToken.address);
        });

        await deployer.deploy(GameNft).then(function () {
            console.log("GameNft contract was deployed at address: " + GameNft.address);
        });

        await deployer.deploy(Destruct, GLDToken.address).then(function () {
            console.log("Destruct contract was deployed at address: " + Destruct.address);
        });
};
