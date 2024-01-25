// SPDX-License-Identifier: MIT
// @note use older version since selfdestruct was deprecated in 0.8.18
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Destruct {
    address public owner;
    IERC20 public token;

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "caller is not the owner");
        _;
    }

    receive() external payable {}

/*     function deposit() external payable { 
        // if deposit amount > tokens amount call selfdestruct
    } */

    function destroy(address payable recipient) external onlyOwner() {
        // Transfer all ERC-20 tokens to the recipient
        uint256 balance = token.balanceOf(address(this));
        token.transfer(recipient, balance);
        selfdestruct(recipient);
        
    }  


}