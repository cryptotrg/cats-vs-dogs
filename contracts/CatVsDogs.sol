// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CatVsDogs {
    enum VoteOption { Cats, Dogs }

    VoteOption public currentVote;
    address public lastVoter;
    uint256 public totalVotes;

    event VoteChanged(VoteOption indexed newVote, address indexed voter);

    constructor() {
        currentVote = VoteOption.Cats;
        totalVotes = 1;
    }

    function voteCats() public {
        vote(VoteOption.Cats);
    }

    function voteDogs() public {
        vote(VoteOption.Dogs);
    }

    function vote(VoteOption _vote) internal {
        require(currentVote != _vote, "Current vote is already set to this option. Transaction reverted.");
        currentVote = _vote;
        lastVoter = msg.sender;
        totalVotes += 1;
        emit VoteChanged(_vote, msg.sender);
    }
}
