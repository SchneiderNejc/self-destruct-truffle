// SPDX-License-Identifier: MIT
// @note use older version since selfdestruct was deprecated in 0.8.18
pragma solidity 0.8.13;


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

/*     function deposit() external payable { 
        // if deposit amount > tokens amount call selfdestruct
    } */

    function destruct(address payable recepient) external onlyOwner() {
        selfdestruct(recepient);
        
    }  
}