require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{ version: "0.7.6" }, { version: "0.8.17" }],
<<<<<<< HEAD:contract/hardhat.config.js
  },
  paths: {
    artifacts: "../client/src/artifacts",
=======
>>>>>>> main:hardhat.config.js
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {
      forking: {
<<<<<<< HEAD:contract/hardhat.config.js
        url: "https://eth-mainnet.g.alchemy.com/v2/54MkzWl-g5MhyDsRpbR01xGWMHVnUlbr",
=======
        url: "https://eth-mainnet.alchemyapi.io/v2/",
>>>>>>> main:hardhat.config.js
        blockNumber: 14390000,
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};
