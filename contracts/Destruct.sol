// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Destruct {
    address public owner;

    modifier onlyOwner() {
        require(owner == msg.sender, "caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}


    function destruct(address payable recepient) external onlyOwner() {
        selfdestruct(recepient);
        
    }  
}