// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract voting {
    address public owner = msg.sender;

    struct Candidate {
        string name;
        string party;
        uint256 id;
    }

    uint256 totalCandidates = 0;

    mapping(uint256 => Candidate) candidates;

    uint256[] candidateIds;

    // candidate id to votes for that candidate
    mapping(uint256 => uint256) votes;

    // voter address, set to true if user has voted
    mapping(address => bool) hasVoted;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    modifier hasntAlreadyVoted() {
        require(hasVoted[msg.sender] == false, "User has already voted!");
        _;
    }

    function addCandidate(
        string memory name,
        string memory party,
        uint256 id
    ) public restricted {
        Candidate memory newCandidate = Candidate(name, party, id);

        totalCandidates++;
        candidates[id] = newCandidate;
        votes[id] = 0;

        candidateIds.push(id);
    }

    function getCandidateName(uint256 id) public view returns (string memory) {
        return candidates[id].name;
    }

    function castVote(uint256 id) public hasntAlreadyVoted {
        votes[id] = votes[id] + 1;
        hasVoted[msg.sender] = true;
    }

    function getVotesForCandidate(uint256 candidateId)
        public
        view
        returns (uint256)
    {
        return votes[candidateId];
    }

    function resetVotes() public {
        for (uint256 i = 0; i < candidateIds.length; i++) {
            votes[candidateIds[i]] = 0;
        }
    }
}
