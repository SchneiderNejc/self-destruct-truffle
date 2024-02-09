var Destruct = artifacts.require("./Destruct.sol");
var GLDToken = artifacts.require("./GLDToken.sol");
var GameNft = artifacts.require("./GameNft.sol");

var initSupply = 10**6 * 10**18; //one million (10^18 = convert wei to ether)


module.exports = async function (deployer, network) {

        let owner = (await web3.eth.getAccounts())[0];
        console.log("owner: " ,owner);
        var gldToken = "0x9f1DEd9BC243cB2fec733d0E280aECb9f6dA6E2a";


        await deployer.deploy(GLDToken, initSupply).then(function () {
             console.log("GLDToken deployed at: " + GLDToken.address);
        });

        await deployer.deploy(GameNft).then(function () {
            console.log("GameNft deployed at: " + GameNft.address);
        });

    await deployer.deploy(Destruct, GLDToken.address).then(function () {
            console.log("Destruct deployed at: " + Destruct.address);
        });
};
