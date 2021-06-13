const voting = artifacts.require('voting')
const truffleAssert = require('truffle-assertions')

contract('voting', function ([contractOwner, voter1, voter2]) {
  let subject
  let newCandidate

  beforeEach(async () => {
    subject = await voting.deployed()

    newCandidate = {
      name: 'Bob',
      party: 'Democrat',
      id: 1,
    }
  })

  afterEach(async () => {
    await subject.resetVotes()
  })

  it('should be able to be deployed', async function () {
    return assert.isTrue(true)
  })

  it('only owner can add candidates', async function () {
    await subject.addCandidate(
      newCandidate.name,
      newCandidate.party,
      newCandidate.id,
    )

    const name = await subject.getCandidateName(newCandidate.id, {
      from: contractOwner,
    })

    expect(name).to.equal(newCandidate.name)
  })

  it('user who is NOT the owner CANNOT add candidates', async function () {
    await subject.addCandidate(
      newCandidate.name,
      newCandidate.party,
      newCandidate.id,
    )

    await truffleAssert.reverts(
      subject.addCandidate(
        newCandidate.name,
        newCandidate.party,
        newCandidate.id,
        { from: voter1 },
      ),
    )
  })

  it('anyone can cast a vote', async function () {
    await subject.castVote(newCandidate.id, { from: voter1 })

    await subject.castVote(newCandidate.id, { from: voter2 })

    const voteCount = await subject.getVotesForCandidate(newCandidate.id)

    expect(+voteCount).to.eql(2)
  })

  it('should allow only one vote per user', async () => {
    await subject.castVote(newCandidate.id, { from: voter1 })
    
    const shouldRevert = subject.castVote(newCandidate.id, { from: voter1 });

    truffleAssert.reverts(shouldRevert);

  })
})
