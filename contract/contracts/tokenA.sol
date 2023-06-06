// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyTokenA is ERC20 {
    constructor() ERC20("MyTokenA", "MTKA") {}

    function mint(uint256 amount) public  {
        _mint(msg.sender, amount);
    }
}