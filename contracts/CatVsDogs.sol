// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CatVsDogs {
    enum VoteOption { Cat, Dog }

    uint256 public catVotes;
    uint256 public dogVotes;
    address public lastVoter;

    event VotesChanged(uint256 indexed catVotes, uint256 indexed dogVotes, address indexed lastVoter);

    constructor() {
        catVotes = 0;
        dogVotes = 0;
    }

    function voteForCat() public {
        catVotes++;
        update();
    }

    function voteForDog() public {
        dogVotes++;
        update();
    }

    function update() private {
        lastVoter = msg.sender;
        emit VotesChanged(catVotes, dogVotes, lastVoter);
    }
}
