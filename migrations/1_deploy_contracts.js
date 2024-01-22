var Destruct = artifacts.require("./Destruct.sol");


async function getAccount(id) {

    let accounts = await web3.eth.getAccounts();
    return accounts[id];
}


module.exports = async function (deployer, network) {

    if (network == "ganache") {

        var owner = getAccount(0);

        console.log("attempting deploy");

        await deployer.deploy(Destruct).then(function () {
            console.log("Destruct contract was deployed at address: " + Destruct.address);
        });
    } 
};
