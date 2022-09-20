import React, { useState } from "react";
import { web3, wethContract } from "../Web3";
import '../Weth.css';

const WithdrawWeth = () => {
  const [inputValue, setInputValue] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const withdraw = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    try {
      await wethContract.methods.withdraw(web3.utils.toWei(inputValue, "ether")).send({ from: account });
      alert("Withdrawn successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="wethform">
      <label className="DepoName">
       <input className="inputWeth" type="number" placeholder="Get Eth" onChange={handleChange} />
      </label>
      <button className="BtnWeth" onClick={withdraw}>Withdraw</button>
    </form>
  );
};

export default WithdrawWeth;
