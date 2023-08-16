
// /*
// 11:00:09 --> Solidity Style Guide, without comments

// pragma solidity ^0.8.8;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// import "./PriceConverter.sol";

// error FundMe__NotOwner();

// /**
//  * @title A contract for crowd funding
//  * @author Patrick Collins
//  * @notice This contract is to demo a simple funding contract
//  * @dev This implements price feeds as our library 
//  */

// contract FundMe {
//     using PriceConverter for uint256;

//     mapping(address => uint256) public addressToAmountFunded;
//     address[] public funders;
	

    
//     address public immutable i_owner;
//     uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

//     AggregatorV3Interface public priceFeed;

//     modifier onlyOwner {
//         if (msg.sender != i_owner) revert FundMe__NotOwner(); 
//         _;
//     }

    
//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     receive() external payable {
//         fund();
//     }

//     fallback() external payable {
//         fund();
//     }

//     /**
//      * @notice This function funds this contract
//      * @dev This implements price feeds as our library 
//      */

//     function fund() public payable {
//         require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
//         addressToAmountFunded[msg.sender] += msg.value;
//         funders.push(msg.sender);
//     }
    
//     function withdraw() public onlyOwner {
//         for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }
//         funders = new address[](0);
    
//         (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
//         require(callSuccess, "Call failed");
//     }

// }

// */

/*
// 11:18:28 --> Patrick said we wont be writing test for `receive() and fallback()` so he removed it 

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error FundMe__NotOwner();

/**
 * @title A contract for crowd funding
 * @author Patrick Collins
 * @notice This contract is to demo a simple funding contract
 * @dev This implements price feeds as our library 
 */

// contract FundMe {
//     using PriceConverter for uint256;

//     mapping(address => uint256) public addressToAmountFunded;
//     address[] public funders;
    
//     address public immutable i_owner;
//     uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

//     AggregatorV3Interface public priceFeed;

//     modifier onlyOwner {
//         if (msg.sender != i_owner) revert FundMe__NotOwner(); 
//         _;
//     }

//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     /**
//      * @notice This function funds this contract
//      * @dev This implements price feeds as our library 
//      */

//     function fund() public payable {
//         require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
//         addressToAmountFunded[msg.sender] += msg.value;
//         funders.push(msg.sender);
//     }
    
//     function withdraw() public onlyOwner {
//         for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }
//         funders = new address[](0);
    
//         (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
//         require(callSuccess, "Call failed");
//     }

// }
// */


/*
// 11:36:39 ---> console.log & debugging

// When running your contracts and tests on Hardhat Network you can print logging messages and contract 
// variables calling console.log() from your Solidity code. To use it you have to 
// import hardhat/console.sol in your contract code.
// This is what it looks like:

// pragma solidity ^0.8.0;

// import "hardhat/console.sol";

// contract Token {
//   //...
// }

// Patrick said we should try it out ourselves which i did 
// I added some things in my FundMe.sol 
// after i have done that 
// i ran ---> yarn hardhat test, Bingo it worked 

// Here is what it displayed 

// Compiling 2 files with 0.8.8
// Solidity compilation finished successfully

//   FundMe
//     constructor
//       ✓ sets the aggregator addressed correctly
//     fund
//       ✓ Fails if you dont send enough ETH
// Display the address of the sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//       ✓ update the amount funded data structure
// Display the address of the sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//       ✓ Adds funder to array of funders
//     withdraw
// Display the address of the sender 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//       ✓ withdraw ETH from a single founder


//   5 passing (557ms)

// Done in 4.39s.

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error FundMe__NotOwner();

// /**
//  * @title A contract for crowd funding
//  * @author Patrick Collins
//  * @notice This contract is to demo a simple funding contract
//  * @dev This implements price feeds as our library 
//  */

// contract FundMe {
//     using PriceConverter for uint256;

//     mapping(address => uint256) public addressToAmountFunded;
//     address[] public funders;
	
//     address public immutable i_owner;
//     uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

//     AggregatorV3Interface public priceFeed;

//     modifier onlyOwner {
//         if (msg.sender != i_owner) revert FundMe__NotOwner(); 
//         _;
//     }

    
//     constructor(address priceFeedAddress) {
//         i_owner = msg.sender;
//         priceFeed = AggregatorV3Interface(priceFeedAddress);
//     }

//     /**
//      * @notice This function funds this contract
//      * @dev This implements price feeds as our library 
//      */

//     function fund() public payable {
//         require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
//         addressToAmountFunded[msg.sender] += msg.value;
//         funders.push(msg.sender);

//         // Here i just tested the features of debugging using hardhat in our solidity code 
//         console.log("Display the address of the sender", funders[0]);
//     }
    
//     function withdraw() public onlyOwner {
//         for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
//             address funder = funders[funderIndex];
//             addressToAmountFunded[funder] = 0;
//         }
//         funders = new address[](0);
    
//         (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
//         require(callSuccess, "Call failed");
//     }

// }

// */

// 11:37:31 ---> Testing Fund Me II
// I didnt add any new code here, i just want to remove the console.log is did in `console.log and debugging`

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "hardhat/console.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error FundMe__NotOwner();

/**
 * @title A contract for crowd funding
 * @author Patrick Collins
 * @notice This contract is to demo a simple funding contract
 * @dev This implements price feeds as our library 
 */

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;
	
    address public immutable i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

    AggregatorV3Interface public priceFeed;

    modifier onlyOwner {
        if (msg.sender != i_owner) revert FundMe__NotOwner(); 
        _;
    }

    
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     * @notice This function funds this contract
     * @dev This implements price feeds as our library 
     */

    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
    
    function withdraw() public onlyOwner {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
    
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

}