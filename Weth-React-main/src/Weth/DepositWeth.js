import React, { useState } from "react";
import { web3, wethContract } from "../Web3";
import '../Weth.css';

const DepositWeth = () => {
  const [inputValue, setInputValue] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const deposit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    try {
      await wethContract.methods.deposit().send({ from: account, value: web3.utils.toWei(inputValue, "ether") });
      alert("Deposited successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="wethform">
      <label className="DepoName">
       <input className="inputWeth" type="number" placeholder="Get Weth" onChange={handleChange} />
      </label>
      <button className="BtnWeth" onClick={deposit}>Deposit</button>
    </form>
  );
};

export default DepositWeth;
