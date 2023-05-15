const { ethers } = require("hardhat");
describe("Contract deployment", function () {
  const ercAbi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function deposit() public payable",
    "function approve(address spender, uint256 amount) returns (bool)",
  ];
  const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  let signers, uniswapContract;
  it("", async function () {
    [...signers] = await ethers.getSigners();
    const uniswapFactory = await ethers.getContractFactory(
      "UniswapV2SwapExamples"
    );
    uniswapContract = await uniswapFactory.deploy();
    await uniswapContract.deployed();
    console.log("uniswap contract deployed at: ", uniswapContract.address);
  });
  describe("connect with WETH", function () {
    it("wrap some weth", async function () {
      const WETHcontract = new ethers.Contract(WETHAddress, ercAbi, signers[0]);
      const deposit = await WETHcontract.deposit({
        value: ethers.utils.parseEther("10"),
      });
      await deposit.wait();
      const WEThBalance = await WETHcontract.balanceOf(signers[0].address);
      console.log("WETH Balance ", WEThBalance.toString());
      await WETHcontract.approve(
        uniswapContract.address,
        ethers.utils.parseEther("2")
      );
    });
  });

  describe("Swapping WETH to DAI", function () {
    it("should swap single Hop EXact Amount In", async function () {
      const amountIn = ethers.utils.parseEther("0.1");
      const swaptxn = await uniswapContract.swapSingleHopExactAmountIn(
        amountIn,
        0
      );
      await swaptxn.wait();
    });
  });
  describe("Connect to DAI", function () {
    it("check some dai Balacnce", async function () {
      const DAI = new ethers.Contract(DAIAddress, ercAbi, signers[0]);
      const daiBalance = await DAI.balanceOf(signers[0].address);
      console.log("DAI  Balance after swap", daiBalance.toString());
      await DAI.approve(uniswapContract.address, ethers.utils.parseEther("1"));
    });
  });
  describe("swap DAI -> WETH -> USDC", function () {
    it("should swap DAI to USDC", async function () {
      let amountIn = ethers.utils.parseEther("0.1");
      let amountOut = 1;
      const swaptxn = await uniswapContract.swapMultiHopExactAmountIn(
        amountIn,
        amountOut
      );
      await swaptxn.wait();
    });
  });
  describe("Connect to USDC", function () {
    it("check USDC balance", async function () {
      const USDC = new ethers.Contract(USDCAddress, ercAbi, signers[0]);
      const usdcBalance = await USDC.balanceOf(signers[0].address);
      console.log("USDC Balance after swap ", usdcBalance.toString());
    });
  });
});
