const VotingContractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "catVotes",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dogVotes",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "lastVoter",
                "type": "address"
            }
        ],
        "name": "VotesChanged",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "catVotes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dogVotes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastVoter",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "voteForCat",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "voteForDog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export default VotingContractABI;
