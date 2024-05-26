const hre = require("hardhat");
const fs = require('fs');
const JSON5 = require('json5');

async function main() {
    const networksData = JSON5.parse(fs.readFileSync('app/src/data/networks.json', 'utf8'));
    const abi = JSON.parse(fs.readFileSync('app/src/data/abi.json', 'utf8'));

    const { accounts } = JSON5.parse(fs.readFileSync('./wallets.json5', 'utf8'));

    for (const account of accounts) {
        const wallet = new hre.ethers.Wallet(account.key, hre.ethers.provider);
        for (const [networkName, networkInfo] of Object.entries(networksData)) {
            if (networkName === 'Polygon') {
                continue;
            }
            console.log(`Voting on "${networkName}" by "${account.name}" with address ${wallet.address}`);
            try {
                await hre.network.provider.request({
                    method: "hardhat_impersonateAccount",
                    params: [wallet.address],
                });

                const provider = new hre.ethers.providers.JsonRpcProvider(networkInfo.rpcUrls[0]);
                const signer = wallet.connect(provider);
                const contract = new hre.ethers.Contract(networkInfo.contractAddress, abi, signer);

                const voteFor = Math.random() < 0.5 ? 'voteForCat' : 'voteForDog';

                console.log(`...for ${voteFor === 'voteForCat' ? 'cats' : 'dogs'}`);
                const tx = await contract[voteFor]();
                await tx.wait();

                console.log(`...successful in ${networkName} with tx: ${tx.hash}`);

                const catVotes = await contract.catVotes();
                console.log("...catVotes:", catVotes.toString());

                const dogVotes = await contract.dogVotes();
                console.log("...dogVotes:", dogVotes.toString());

                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (error) {
                console.error(`Failed to vote in ${networkName} as ${wallet.address}:`, error.message);
            }
        }
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exit(1);
});
