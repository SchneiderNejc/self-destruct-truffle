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

    //--------------------------------------------------
    // Parameters setup
    //--------------------------------------------------

    let sender = accounts[1];
    let receiver = "0x85E4F70c9E5b838E05667F16489260bf6Dfd109B";
    let amount = 5;  //amount in wei, not ether

    //--------------------------------------------------
    // Function calls
    //--------------------------------------------------

    await transferEth(); 

    // --------------------------------------------------
    // External function calls
    // --------------------------------------------------

    async function transferEth() {
        //NOTE set denominator; 'wei'=1, 'mwei'=10^6, 'szabo'=10^12, 'ether'=10^18
        const amountWei = web3.utils.toWei('5', 'szabo');
        console.log(`transfering eth...`);
        await web3.eth.sendTransaction({ from: sender, to: receiver, value: amountWei });
        console.log(`${web3.utils.fromWei((amountWei))} Ether sent to ${receiver}`);
    }


}.bind(this);