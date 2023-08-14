// Important Notice

// Continuation LESSON 7: Hardhat fundme ---> continuation from 11:08:36 Testing Fund Me which is the 
// repository hardhat-fund-me-fcc

// i created another repository similar to -> hardhat-fund-me-fcc
// because am having issues with running test

// so what i intended in this repository is that, i will use the repository from the lesson 7 section by
// cloning it, since the test is working perfectly. i concluded with this because i have done everything 
// possible by creating different repository and testing them to see where the fault is from.
// so i guess it will be the package version currently is not compactable with the code in the lession 7

// so what i will do is that i will cotinue from the last repository which is --> 11:08:36 Testing Find Me

///////////////////////////////////////////////////////////

// 11:08:36 --> Testing FundMe, i just splitted it 1.

// Here we create a variable for deployer and extract it differently
// we create a variable for mockV3Aggregator

const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        // We need our MockV3Aggregator since we will deploy locally
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    // We want to write test for our constructor
    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })
})
