let Token = artifacts.require("GLDToken.sol");
let Destruct = artifacts.require("Destruct.sol");

const { ethBalance } = require('./transferEth.js');
const { balanceOf } = require('./gldToken.js');

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

    // uprade pre-deployed contract addresses
    let destruct = await Destruct.at("0x85E4F70c9E5b838E05667F16489260bf6Dfd109B");
    let token = await Token.at("0x9f1DEd9BC243cB2fec733d0E280aECb9f6dA6E2a");

    //--------------------------------------------------
    // Parameters setup
    //--------------------------------------------------

    let recipient = accounts[0]; //receiver of ether and "token" upon selfdestruct

    //--------------------------------------------------
    // Function calls
    //--------------------------------------------------

    //await owner(); 
    // --------------------------------------------------
    // External function calls
    // --------------------------------------------------

    async function owner() {
        try {
            const owner = await destruct.owner();
            console.log("Owner of the contract:", owner);
        } catch (error) {
            console.error("Error retrieving contract owner:", error);
        }
    }
}.bind(this);
