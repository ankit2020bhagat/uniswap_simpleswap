// SPDX-License-Identifier: MIT
import "./IERC20.sol";
import  "./IuniswapV2Router.sol";
import  "./IniswapV2Factory.sol";
pragma solidity ^0.8.17;

contract TestUniswapLiquidity {
    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint public amountA;
     uint public amountB;
      uint public liquidity;
    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint _amountA,
        uint _amountB
    ) external returns(uint ,uint,uint){
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(ROUTER, _amountA);
        IERC20(_tokenB).approve(ROUTER, _amountB);

        ( amountA,  amountB,  liquidity) = IUniswapV2Router(ROUTER)
            .addLiquidity(
                _tokenA,
                _tokenB,
                _amountA,
                _amountB,
                1,
                1,
                address(this),
                block.timestamp
            );
        return (amountA,amountB,liquidity );
    }

    function removeLiquidity(address _tokenA, address _tokenB) external returns(uint,uint,uint){
        address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);

         liquidity = IERC20(pair).balanceOf(address(this));
        IERC20(pair).approve(ROUTER, liquidity);

        ( amountA,  amountB) = IUniswapV2Router(ROUTER).removeLiquidity(
            _tokenA,
            _tokenB,
            liquidity,
            1,
            1,
            address(this),
            block.timestamp
        );
        return(amountA,amountB,liquidity);
    }
}
