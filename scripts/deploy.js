const { expect } = require("chai");
const { ethers } = require("hardhat");

async function main() {
  let UniswapV2SwapExamples, accounts;

  [owner, alice] = await ethers.getSigners();
  const swapFactory = await ethers.getContractFactory("UniswapV2SwapExamples");
  UniswapV2SwapExamples = await swapFactory.deploy();
  await UniswapV2SwapExamples.deployed();
  console.log("Contract deployed at: ", UniswapV2SwapExamples.address);
  const WETHBalnce = await ethers.provider.getBalance(
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  );
  console.log(`WETH Balance ${WETHBalnce}`);
  const DIAbalance = await ethers.provider.getBalance(
    "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  );
  console.log(`DAI Balance ${DIAbalance}`);
  const USDCBalance = await ethers.provider.getBalance(
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  );
  console.log(`USDC Balance ${USDCBalance}`);

  const amountIn = ethers.utils.parseEther("1");
  const amountOutMin = ethers.utils.parseUnits("2000", 18);

  // Approve the contract to spend WETH on behalf of the test account
  await UniswapV2SwapExamples.connect(alice)
    .weth()
    .approve(UniswapV2SwapExamples.address, amountIn);

  // Call the function and verify the output
  const amountOut = await UniswapV2SwapExamples.connect(
    alice
  ).swapSingleHopExactAmountIn(amountIn, amountOutMin);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
