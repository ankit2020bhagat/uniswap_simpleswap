import React, { useEffect, useState } from "react";
import "./styles/App.css";

import contractAbi from "./artifacts/contracts/swap.sol/SimpleSwap.json";
import { ethers } from "ethers";
const contractAddress = "0xefc1aB2475ACb7E60499Efb171D173be19928a05";
const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const ercAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function deposit() public payable",
  "function approve(address spender, uint256 amount) returns (bool)",
];
function App() {
  const [currentAccount, setAccount] = useState(null);
  const [WethAmount, setWeth] = useState(0);
  const [DaiAmount, setDai] = useState(0);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("connected ", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Mske sure you have a MetaMask");
      return;
    } else {
      console.log("We have Etherreum object ", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_requesrtAccounts" });
    if (accounts.length != 0) {
      const account = accounts[0];
      console.log("Found an Authorise Account ", account);
      setAccount(account);
    } else {
      console.log("No Authorise Account found");
    }
  };

  const connectToWeth = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signers = provider.getSigner();
        const Weth = new ethers.Contract(WETHAddress, ercAbi, signers);
        const deposit = await Weth.deposit({
          value: ethers.utils.parseEther("5"),
        });
        await deposit.wait();
        const balance = await Weth.balanceOf(currentAccount);
        setWeth(balance.toString());
        console.log("WETH  Amount ", balance.toString());
        await Weth.approve(contractAddress, ethers.utils.parseEther("1"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectToDai = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signers = provider.getSigner();
        const Dai = new ethers.Contract(DAIAddress, ercAbi, signers);
        const balance = await Dai.balanceOf(currentAccount);
        setDai(balance.toString());
        console.log("DAI Amount ", balance.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const swap = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signers = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signers
        );
        connectToDai();
        const txn = await contract.swapWETHForDAI(
          ethers.utils.parseEther("0.1")
        );
        await txn.wait();
        connectToDai();

        console.log("WETH  Amount ", WethAmount.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const balance = async () => {
    return (
      <div>
        <h3>
          WETH Balance: {WethAmount}
          <br />
          DAI Balance: {DaiAmount}
        </h3>
      </div>
    );
  };

  const renderNotConnectedContainer = () => (
    <div className="connect-wallet-container">
      <img
        src="https://media.giphy.com/media/3ohhwytHcusSCXXOUg/giphy.gif"
        alt="Ninja gif"
      />
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    </div>
  );

  useState(() => {
    checkIfWalletIsConnected();
    balance();
  }, [WethAmount, DaiAmount]);
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <header>
            <div className="left">
              <p className="title">🐱‍👤 Decentralised Exchange</p>
              <p className="subtitle">Trade your ERC20 token</p>
            </div>
          </header>
        </div>
        {!currentAccount && renderNotConnectedContainer()}
        <div className="button-container">
          <button className="cta-button mint-button" onClick={connectToWeth}>
            Get WETH
          </button>
        </div>
        <div className="button-container">
          <button className="cta-button mint-button" onClick={swap}>
            swap WETH to DAI
          </button>
        </div>

        <div className="footer-container">;</div>
      </div>
    </div>
  );
}

export default App;
