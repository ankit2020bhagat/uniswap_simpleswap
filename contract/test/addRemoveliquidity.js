const { ethers } = require("hardhat");

describe("AddRemove liquidity contract ", function () {
  let accounts, tokenA, tokenB, uniswapContract;
  it("contract deployemtn", async function () {
    const contractFactory = await ethers.getContractFactory(
      "TestUniswapLiquidity"
    );
    [...accounts] = await ethers.getSigners();
    uniswapContract = await contractFactory.deploy();
    await uniswapContract.deployed();
    console.log("Contract Deployed at ", uniswapContract.address);
    const tokenAFactory = await ethers.getContractFactory("MyTokenA");
    tokenA = await tokenAFactory.deploy();
    await tokenA.deployed();
    console.log("tokenA deployed at ", tokenA.address);
    const tokenBFactory = await ethers.getContractFactory("MyTokenB");
    tokenB = await tokenBFactory.deploy();
    await tokenB.deployed();
    console.log("tokenB deployed at", tokenB.address);
  });
  describe("minting tokenA", function () {
    it("mintting tokenA and tokenB and approving ", async function () {
      let minttxn = await tokenA.connect(accounts[1]).mint(10000);
      await minttxn.wait();
      minttxn = await tokenB.connect(accounts[1]).mint(10000);
      await minttxn.wait();
      let txn = await tokenA
        .connect(accounts[1])
        .approve(uniswapContract.address, ethers.utils.parseEther("10"));
      await txn.wait();
      txn = await tokenB
        .connect(accounts[1])
        .approve(uniswapContract.address, ethers.utils.parseEther("10"));
      await txn.wait();
      txn = await tokenA
        .connect(accounts[1])
        .transfer(uniswapContract.address, 2000);
      await txn.wait();
      txn = await tokenB
        .connect(accounts[1])
        .transfer(uniswapContract.address, 1000);
      await txn.wait();
    });
  });
  describe("add liquidity", function () {
    it("Should add liquidity from the pool", async function () {
      const txn = await uniswapContract
        .connect(accounts[1])
        .addLiquidity(tokenA.address, tokenB.address, 2000, 1000);
      await txn.wait();
      const amountA = await uniswapContract.amountA();
      console.log("Amount A", amountA.toString());
      const amountB = await uniswapContract.amountB();
      console.log("Amount B", amountB.toString());
      const liquidity = await uniswapContract.liquidity();
      console.log("Liquidity ", liquidity.toString());
    });
  });

  describe("remove liquidity", function () {
    it("Should remove liquidity from the pool", async function () {
      const txn = await uniswapContract.removeLiquidity(
        tokenA.address,
        tokenB.address
      );
      const amountA = await uniswapContract.amountA();
      console.log("Amount A", amountA.toString());
      const amountB = await uniswapContract.amountB();
      console.log("Amount B", amountB.toString());
      const liquidity = await uniswapContract.liquidity();
      console.log("Liquidity ", liquidity.toString());
    });
  });
});
