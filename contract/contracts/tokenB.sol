// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyTokenB is ERC20 {
    constructor() ERC20("MyTokenB", "MTKB") {}

    function mint(uint256 amount) public  {
        _mint(msg.sender, amount);
    }
}