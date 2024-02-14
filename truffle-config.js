var HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();


module.exports = {

  networks: {
    development: {
      network_id: "*",
      host: '127.0.0.1',
      port: 9545
    },

    bsctestnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545/`, 0, 3),
      network_id: 97,
      confirmations: 3,   //finalization; no. of blocks confirmed after tx was successful. Default 0.
      timeoutBlocks: 200, //timeout no. of blocks for tx to be confirmed. After set no. tx is considered failed (by truffle). Default null.
      skipDryRun: true    //simulates faster migrations, but unrealistic behavioud; true for testnet, false for mainnet. Default false.
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



  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13"    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}
