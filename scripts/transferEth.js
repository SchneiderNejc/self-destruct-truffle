let accounts;

module.exports = async function (callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
    ethBalance: ethBalance;
};

let init = async function (networkId) {

    //--------------------------------------------------
    // Accounts and contracts configuration
    //--------------------------------------------------

    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    //--------------------------------------------------
    // Parameters setup
    //--------------------------------------------------

    let sender = accounts[1];
    let receiver = "0x85E4F70c9E5b838E05667F16489260bf6Dfd109B";
    let amount = 5;  //amount in wei, not ether

    //--------------------------------------------------
    // Function calls
    //--------------------------------------------------

    //await transferEth(); 
    await printEthBalance(receiver);

    // --------------------------------------------------
    // External function calls
    // --------------------------------------------------

    async function transferEth() {
        //NOTE set denominator; 'wei'=1, 'mwei'=10^6, 'szabo'=10^12, 'ether'=10^18
        const amountWei = web3.utils.toWei(amount.toString(), 'szabo');
        console.log(`transfering eth...`);
        let receipt = await web3.eth.sendTransaction({ from: sender, to: receiver, value: amountWei });
        console.log(receipt);
        let hash = receipt.transactionHash;
        console.log(hash);
        console.log(`${web3.utils.fromWei((amountWei))} Ether sent to ${receiver}`);
    }

    async function printEthBalance(address) {
        const balance = await ethBalance(address);
        console.log(`${balance} ether is owned by ${address}`);
    }

    //--------------------------------------------------
    // Helper functions
    //--------------------------------------------------

    async function ethBalance(address) {
        return web3.utils.fromWei(await web3.eth.getBalance(address));
    }


}.bind(this);
