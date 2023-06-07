const { ethers } = require("hardhat");

describe.only("Contract Deployment...", function () {
  let swapContract, signers;
  const SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const ercAbi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function deposit() public payable",
    "function approve(address spender, uint256 amount) returns (bool)",
  ];

  it("Balance ", async function () {
    signers = await ethers.getSigners();
    const swapFactory = await ethers.getContractFactory("SimpleSwap");
    swapContract = await swapFactory.deploy(SwapRouterAddress);
    await swapContract.deployed();
    console.log("Contract deployed at: ", swapContract.address);
    const WETHBalnce = await ethers.provider.getBalance(WETHAddress);
    console.log(`WETH Balance ${WETHBalnce}`);
    const DIAbalance = await ethers.provider.getBalance(DAIAddress);
    console.log(`DAI Balance ${DIAbalance}`);
    const USDCBalance = await ethers.provider.getBalance(USDCAddress);
    console.log(`USDC Balance ${USDCBalance}`);
  });
  describe("connect to WETH ", function () {
    it("wrap some eth", async function () {
      const WETH = new ethers.Contract(WETHAddress, ercAbi, signers[0]);
      const deposit = await WETH.deposit({
        value: ethers.utils.parseEther("10"),
      });
      await deposit.wait();
      const balalnce = await WETH.balanceOf(signers[0].address);
      console.log("WETH Balance ", balalnce.toString());
      await WETH.approve(swapContract.address, ethers.utils.parseEther("1"));
    });
  });
  describe("Connect to DAI", function () {
    it("check some dai Balacnce", async function () {
      const DAI = new ethers.Contract(DAIAddress, ercAbi, signers[0]);
      const daiBalance = await DAI.balanceOf(signers[0].address);
      console.log("DAI initial Balance", daiBalance.toString());
    });
  });

  describe("Swap", function () {
    it("swap WETH to DAI", async function () {
      const swap = await swapContract.swapWETHForDAI(
        ethers.utils.parseEther("0.1")
      );
      await swap.wait();
      const DAI = new ethers.Contract(DAIAddress, ercAbi, signers[0]);
      const daiBalance = await DAI.balanceOf(signers[0].address);
      console.log("DAI Balance after swap", daiBalance.toString());
    });
  });
});
