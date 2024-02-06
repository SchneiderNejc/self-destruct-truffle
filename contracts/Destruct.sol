// SPDX-License-Identifier: MIT
/// @notice use older version since selfdestruct was deprecated in 0.8.18
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 *  @title Destruct refunding mechanism
 *  @author Nejc Schneider
 *  @notice In addition to refunding ether, this contract also refunds 
 *          custom ERC20 tokens upon selfdestruct.
 */
contract Destruct {
    address public immutable owner;
    IERC20 public immutable token;

    /// @param _token ERC20 token address that will be refunded upon selfdestruct
    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "caller is not the owner");
        _;
    }

    /// @notice Contract can receive native and custom ERC20, ERC721
    receive() external payable {}

/*     function deposit() external payable { 
        // if deposit amount > tokens amount call selfdestruct
    } */

    /// @param recipient receiver of ether and pre-defined erc20 tokens
    function destroy(address payable recipient) external onlyOwner() {
        // Transfer all ERC-20 tokens to the recipient
        uint256 balance = token.balanceOf(address(this));
        token.transfer(recipient, balance);
        selfdestruct(recipient);
    }  

}