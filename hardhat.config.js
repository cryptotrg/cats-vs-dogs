require('@nomiclabs/hardhat-ethers');
const JSON5 = require('json5');

const accounts = JSON5.parse(require('fs').readFileSync('./wallets.json5', 'utf-8'));
let deployer = accounts.deployer;

module.exports = {
    solidity: "0.8.0",
    networks: {
        polygon: {
            url: "https://polygon-rpc.com",
            accounts: [deployer]
        },
        Base: {
            url: "https://mainnet.base.org",
            accounts: [deployer]
        },
        zora: {
            url: "https://rpc.zora.energy",
            accounts: [deployer]
        },
        XLayer: {
            url: "https://rpc.xlayer.tech",
            accounts: [deployer]
        },
        zkEVM: {
            url: "https://zkevm-rpc.com",
            accounts: [deployer]
        },
        scroll: {
            url: "https://rpc.scroll.io",
            accounts: [deployer]
        },
        Mode: {
            url: "https://mode.drpc.org",
            accounts: [deployer]
        },
        linea: {
            url: "https://linea.decubate.com",
            accounts: [deployer]
        },
    }
};
