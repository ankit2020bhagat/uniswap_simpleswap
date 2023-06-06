import React, { useEffect, useState } from "react";
import "./styles/App.css";
import ercAbi from "./Erc20abi/ercAbi";
import contractAbi from "./artifacts/contracts/uniswapV2Example.sol/UniswapV2SwapExamples.json";
import { ethers } from "ethers";
function App() {
  const [currentAccount, setAccount] = useState(null);

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

  const isValletConncect = async () => {
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
        <div className="footer-container"></div>
      </div>
    </div>
  );
}

export default App;
