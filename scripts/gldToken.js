let Token = artifacts.require("GLDToken.sol");

let accounts;

module.exports = async function (callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
};

let init = async function (networkId) {

    //--------------------------------------------------
    // Accounts and contracts configuration
    //--------------------------------------------------

    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    let token = await Token.at("0x9f1DEd9BC243cB2fec733d0E280aECb9f6dA6E2a");


    //--------------------------------------------------
    // Parameters setup
    //--------------------------------------------------

    let sender = accounts[0];
    let receiver = "0x948962dbc28B7f83fBFd5Ae9812c7a1c94E00E30"; //address[1]
    let amount = 50;  

    //--------------------------------------------------
    // Function calls
    //--------------------------------------------------

    // await transfer();
    // await balanceOf(sender);

    // --------------------------------------------------
    // External function calls
    // --------------------------------------------------

    async function transfer() {
        console.log(`transfering...`);
        await token.transfer(receiver, amount, {from: sender});
        console.log(`${amount} tokens sent to ${receiver}`);
    }

    async function balanceOf(address) {
        var amount = parseInt(await token.balanceOf(address));
        console.log(`${amount} tokens are owned by ${address}`);
    }

    console.log("ran successfully");



}.bind(this);
