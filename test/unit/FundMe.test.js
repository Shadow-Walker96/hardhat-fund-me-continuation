/*
// // Important Notice

// // Continuation LESSON 7: Hardhat fundme ---> continuation from 11:08:36 Testing Fund Me which is the 
// // repository hardhat-fund-me-fcc

// // i created another repository similar to -> hardhat-fund-me-fcc
// // because am having issues with running test

// // so what i intended in this repository is that, i will use the repository from the lesson 7 section by
// // cloning it, since the test is working perfectly. i concluded with this because i have done everything 
// // possible by creating different repository and testing them to see where the fault is from.
// // so i guess it will be the package version currently is not compactable with the code in the lession 7

// // so what i will do is that i will cotinue from the last repository which is --> 11:08:36 Testing Find Me

// ///////////////////////////////////////////////////////////

// // 11:08:36 --> Testing FundMe, i just splitted it 1.

// // Here we create a variable for deployer and extract it differently
// // we create a variable for mockV3Aggregator

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

*/


/*

// // 11:18:46 --> Testing FundMe, we want to write test for fund()

// const { assert } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         // We need our MockV3Aggregator since we will deploy locally
//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     // We want to write test for our constructor
//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     // We want to write test for our fund()
//     describe("fund", async function () {
//         // This line would check if there is enough ether tobe sent --> `require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");`
//         it("Fails if you dont send enough ETH", async function () {
//             await fundMe.fund() 
//             // --> When we run yarn hardhat test at this point it would display this ----> Error: VM Exception while processing transaction: reverted with reason string 'You need to spend more ETH!'
//             // so we want the test to pass bcos we want to test if there is no ETH,
//              // so we want to tell our test net that it sould pass the test if there in no ETH specified
//             // so what we will do is that we would use `ethereum-waffle` to tell the test that it is owk to pass the test if there is no ETH
//         })
//     })
// })

// */

// /*
// // 11:20:06 --> Testing FundMe, we want to write test for fund(), we would use ethereum-waffle
// // Here we need to note that we dont need to import ethereum-waffle bcos chai is over-written with waffle
// // that is to say there is ethereum-waffle inside chai

// const { assert, expect } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     // We want to write test for our fund(), we would use ethereum-waffle which is included in chai so we dont need to import ethereum-waffle
//     describe("fund", async function () {
//         it("Fails if you dont send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
//         })
//     })
// })

// */

/*
// // 11:21:05 --> Testing FundMe, we want write test to update the amount funded in the data structure
// // we want to update this ---> addressToAmountFunded[msg.sender] += msg.value;

const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    // here we can hardcode the value of ETH like this
    // const sendValue = '1000000000000000000' // 1 ETH

    // Or we can use the ethers utility
    // so parseEther("1"), the 1 is converted to 1000000000000000000
    const sendValue = ethers.utils.parseEther("1") // 1 ETH

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })
        // we want to write test that when the user send fund the account it would be
        // updated i.e ---> addressToAmountFunded
        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer) // this line here maps the address of the deployer which is the one that call the fund() and maps the address to addressToAmountFunded, i.e mapping(address => uint256) public addressToAmountFunded;
            assert.equal(response.toString(), sendValue.toString()) // we use toString() bcos remember that solidity and javascript dosent do well with number and the value it would return will be a BigNumber ie '1000000000000000000'
        
        })
    })
    // when we run yarn hardhat coverage, we would see that the percentage has increased which means we have done some test for our contract
})
*/

// /*
// // 11:24:00 --> Testing FundMe, we want write test for putting the funders in the funders array
// // i.e ---> funders.push(msg.sender);

// const { assert, expect } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     const sendValue = ethers.utils.parseEther("1")

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     describe("fund", async function () {
//         it("Fails if you dont send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith(
//                 "You need to spend more ETH!",
//             )
//         })

//         it("update the amount funded data structure", async function () {
//             await fundMe.fund({ value: sendValue })
//             const response = await fundMe.addressToAmountFunded(deployer) 
//             assert.equal(response.toString(), sendValue.toString()) 
//         })

//         it("Adds funder to array of funders", async function () {
//             await fundMe.fund({value: sendValue})
//             const funder = await fundMe.funders(0) // here funders(0), the 0 means the first index which is the deployer address
//             assert.equal(funder, deployer) // here the msg.sender is the deployer i.e --> funders.push(msg.sender);
//         })
//     })
// })
// */

// /*
// // 11:25:15 --> Testing FundMe, we want write test for withdraw function
// // i.e ---> withdraw()

// const { assert, expect } = require("chai")
// const { deployments, ethers, getNamedAccounts } = require("hardhat")

// describe("FundMe", async function () {
//     let fundMe
//     let deployer
//     let mockV3Aggregator

//     const sendValue = ethers.utils.parseEther("1")

//     beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer
//         await deployments.fixture(["all"])
//         fundMe = await ethers.getContract("FundMe", deployer)

//         mockV3Aggregator = await ethers.getContract(
//             "MockV3Aggregator",
//             deployer,
//         )
//     })

//     describe("constructor", async function () {
//         it("sets the aggregator addressed correctly", async function () {
//             const response = await fundMe.priceFeed()
//             assert.equal(response, mockV3Aggregator.address)
//         })
//     })

//     describe("fund", async function () {
//         it("Fails if you dont send enough ETH", async function () {
//             await expect(fundMe.fund()).to.be.revertedWith(
//                 "You need to spend more ETH!",
//             )
//         })

//         it("update the amount funded data structure", async function () {
//             await fundMe.fund({ value: sendValue })
//             const response = await fundMe.addressToAmountFunded(deployer)
//             assert.equal(response.toString(), sendValue.toString())
//         })

//         it("Adds funder to array of funders", async function () {
//             await fundMe.fund({ value: sendValue })
//             const funder = await fundMe.funders(0)
//             assert.equal(funder, deployer)
//         })
//     })

//     // Remember that in the withdraw function only the owner of contract get the money to withdraw
//     describe("withdraw", async function () {
//         // B4 we test the withdraw function they has to be money in the contract
//         // So we will have another beforeEach that will automatically fund the contract
//         beforeEach(async function () {
//             await fundMe.fund({ value: sendValue })
//         })

//         it("withdraw ETH from a single founder", async function () {
//             // Here we would split our test into ---> Arrange, Act, Assert

//             // Arrange ---> first we need to get the starting balance of the fundMe contract and the starting balance of the deployer

//             const startingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address
//             ) // starting balance of fundMe contract
//             const startingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer
//             ) // starting balance of the deployer

//             // Act ---> Second we will run the withdraw function
//             const transactionResponse = await fundMe.withdraw() // Here we call the withdraw function
//             const transactionReceipt = await transactionResponse.wait(1) // here we want for 1 block confirmation

//             const endingFundMeBalance = await fundMe.provider.getBalance(
//                 fundMe.address,
//             ) // The balance after the withdraw of the fundMe contract

//             const endingDeployerBalance = await fundMe.provider.getBalance(
//                 deployer,
//             ) // The balance after the withdraw of the deployer

//             // Assert
//             assert.equal(endingFundMeBalance, 0)

//             // Note here --> startingFundMeBalance + startingDeployerBalance should be written like this startingFundMeBalance.add(startingDeployerBalance)
//             // The reason for the .add() is bcos startingFundMeBalance is calling from the blockchain and is regarded as a BigNumber i.e "1000000000000000000"
//             // also it advisable to convert toString() i.e toString() convert the value to BigNumber and BigNumber is "1000000000000000000"

//             // Also another note is that remember that when the deployer calls the withdraw function, the deployer spent an amount of gas for the transaction
//             assert.equal(
//                 startingFundMeBalance.add(startingDeployerBalance).toString(),
//                 endingDeployerBalance.add(gasCost).toString(),
//             )
//         })
//     })

//     // Important notice here is that we have not run ---> yarn hardhat test
//     // we would continue from here ---> 11:30:38 Breakpoint & Debugging
// })

// */

/*
// 11:30:38 --->  Breakpoint & Debugging
// Here we want to figure out how we will get the gasCost from the transactionResponse and we will now put it in our assert test
// in the endingDeployerBalance
// we can get the gasCost from the transactionReceipt and we can do some trick in visual studio code

// All the explanation to go about it is very simple in visual studio is written in my book


const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            ) 

            const transactionResponse = await fundMe.withdraw() 
            const transactionReceipt = await transactionResponse.wait(1) 

            // Here we want to figure out how we will get the gasCost from the transactionResponse and we will now put it in our assert test
            // in the endingDeployerBalance
            // we can get the gasCost from the transactionReceipt and we can do some trick in visual studio code


            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            ) 

            assert.equal(endingFundMeBalance, 0)

            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
    })
})
*/

// 11:33:39 --->  Gas III

const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    const sendValue = ethers.utils.parseEther("1")

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("update the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("withdraw", async function () {
        beforeEach(async function () {
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            ) 

            const transactionResponse = await fundMe.withdraw() 
            const transactionReceipt = await transactionResponse.wait(1) 

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            ) 

            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer,
            ) 

            assert.equal(endingFundMeBalance, 0)

            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
    })
})
