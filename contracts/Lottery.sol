pragma solidity  ^0.8.3;

import "hardhat/console.sol";
contract Lottery {
    
    address public player;
    uint public initialSupply;
    uint nonce = 0;
    
    mapping(address => uint) balance;
    
    //We are given 100 chips to start
    constructor() {
        player = msg.sender;
        console.log("Player address --> %s", player);
        initialSupply = 1000;
        console.log("Initial supply pre transfer --> %s", initialSupply);
        balance[player] += 100;
        initialSupply -= 100;
        console.log("Initial supply post transfer -->%s", initialSupply);
    }
    
    
    // Random generator, NOT SAFE FOR PRODUCTION!
    function random() public returns (uint) {
    uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % 900;
    randomnumber = randomnumber + 100;
    nonce++;
    return randomnumber;
    }
    
    // Our bet function, if the player guesses the number
    // It wins the whole supply
    function bet(uint guess) public returns(string memory) {
        require(msg.sender == player);
        
        if(guess == random()) {
            balance[player] += initialSupply;
            initialSupply -= initialSupply;
            return "You WON!";
        }
        
        //If the player does not guess the number 
        // It looses 1 chip.
        else {
            balance[player] -= 1;
            return "Try again!";
        }
        
    }
    
    function returnBalance() public view returns(uint) {
        return balance[player];
    }
    
}









