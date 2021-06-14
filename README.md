# Voting Example

<br/>
<br/>

High level description of what needs to be built for the Blockchain Hackathon Voting 2024 dApp. 

<br/>
<br/>

## Requirements:

(Owner Only Functionality)

---

It should:
- allow owner to add a candidate
{
    name: string
    part: string
}

- allow owner to add "votingBegins" and "votingEnds" dates

---


All users (voters) can:

- cast a vote (inside of voting window)
  -> if outside of voting window give error

- allow each user to vote only once.
  -> give error if they try vote twice

- allow any user to get the count of votes for all candidates (standings)


<br/>
<br/>

## Bonus / Optional Features:

- allow each user to change vote after voting and changing their mind later (but still within voting time window).

<br/>

## Frontend

All the above functionality will be built in Solidity, but we need some way for regular end users to interact with our Solidity smart contracts.

This is often done through some front-end browser web application, and we'll follow this proven pattern with our own React frontend.

<br/>

To keep things relatively simple single page web application that should allow users to do these things:

### 1) View Standings / Election Status 
   
   - Shows the current standings of candidates,

   - Shows if the voting window is currently open, has not opened yet, or has already closed.

   - Shows if the current logged in user has already voted or not (and if so, shows what was his or her vote).

 
### 2) Sign Up & Connect Wallet
   
   - Each user enters his or her name, address, SSN, and the public wallet they would like to use to vote.

   (SSN check is necessary and what ensures people can only vote once)

   - users can logout (deletes info from browser storage)


### 3) Casting A Vote

   - If user has logged in and not yet voted, Show two big buttons to allow the user to vote for each candidate.

   - Show an "Are you sure?" popup and let user confirm vote.