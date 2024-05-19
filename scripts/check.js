async function main() {
    const [owner] = await ethers.getSigners();
    const address = '0x8F8FC628c371B96B8c934A7fb65eEC6a75295e34';
    const Contract = await ethers.getContractFactory("CatVsDogs");
    const contract = Contract.attach(address);

    await contract.voteForCat();
    await contract.voteForDog();

    const catVotes = await contract.catVotes();
    console.log("catVotes:", catVotes.toString());

    const dogVotes = await contract.dogVotes();
    console.log("dogVotes:", dogVotes.toString());
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
