let Destruct = artifacts.require("Destruct.sol");
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
    await destroy();    

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

    async function destroy() {
        let contractTokens = await balanceOf(destruct.address);
        let contractEther = await ethBalance(destruct.address);
        console.log(`contract holds: ${contractEther} ether and ${contractTokens} tokens`);

        let recipientBalanceBefore = await balanceOf(recipient);
        let recipientEtherBefore = await ethBalance(recipient);

        try {
            await destruct.destroy(recipient);
            console.log("contract successfuly selfdestructed");
        } catch (error) {
            console.error("contract did not selfdestruct:", error);
        }

        let recipientBalanceAfter = await balanceOf(recipient);
        let recipientEtherAfter = await ethBalance(recipient);

        let receivedEther = recipientEtherAfter - recipientEtherBefore;
        let receivedTokens = recipientBalanceAfter - recipientBalanceBefore;
        console.log(`recipient received: ${receivedEther} ether and ${receivedTokens} tokens`);
        let correctRefund = contractEther == receivedEther && contractTokens == receivedTokens;
        console.log(`tokens were refunded correctly? ${correctRefund}`);
    }

    //--------------------------------------------------
    // Helper functions
    //--------------------------------------------------

    async function ethBalance(address) {
        return web3.utils.fromWei(await web3.eth.getBalance(address));
    }

    async function balanceOf(address) {
        return parseInt(await token.balanceOf(address));
    }

}.bind(this);
