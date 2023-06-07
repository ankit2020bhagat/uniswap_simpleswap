const { expect } = require("chai");
const { ethers } = require("hardhat");

async function main() {
  let UniswapV2SwapExamples, accounts;

  [owner, alice] = await ethers.getSigners();
  const SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const swapFactory = await ethers.getContractFactory("SimpleSwap");
  UniswapV2SwapExamples = await swapFactory.deploy(SwapRouterAddress);
  await UniswapV2SwapExamples.deployed();
  console.log("Contract deployed at: ", UniswapV2SwapExamples.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
