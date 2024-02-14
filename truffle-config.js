var HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();


module.exports = {

  networks: {

    development: {
      network_id: "*",
      host: '127.0.0.1',
      port: 9545
    },

        //--------------------------------------------------
        // Test networks
        //--------------------------------------------------

    bsctestnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545/`, 0, 3),
      network_id: 97,
      confirmations: 1,   //finalization; no. of blocks confirmed after tx was successful. 0 for testnets, 1-2 for main net. Default 0.
      timeoutBlocks: 200, //timeout no. of blocks for tx to be confirmed. After set no. tx is considered failed (by truffle). Default null.
      skipDryRun: true    //simulates faster migrations, but unrealistic behaviour; true for testnet, false for mainnet. Default false.
      // gas: 8500000,           // Off for testnet, on for main net. Value can be found from test migration
      // gasPrice: 20000000000,  // Off for testnet, on for main net. Use current price from Etherscan, GasNow, or Eth Gas Station
    },

    goerli: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/" + process.env.INFURA_KEY, 0, 3),
      network_id: '5',
      skipDryRun: true
    },

    sepolia: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://sepolia.infura.io/v3/" + process.env.INFURA_KEY, 0, 3),
      network_id: '11155111',
      skipDryRun: true
    },

        //--------------------------------------------------
        // L2 networks
        //--------------------------------------------------


  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13"   
      //  optimizer: {        // For cheaper deployment use high amount of runs,
      //    enabled: false,   // for cheaper interactions use low amount of runs,
      //    runs: 200         // or turn the optimizer off. Best tested by migrating
      //  },                  // to test nets first.
    }
  }
}
