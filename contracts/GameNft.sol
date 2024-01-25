// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GameNft is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("GameNft", "ITM") {}

    function mint(address receiver)
        public
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _mint(receiver, tokenId);

        return tokenId;
    }
}