import React, { useState } from "react";
import { web3, wethContract } from "../Web3";
import '../Weth.css';

const TransferWeth = () => {
  const [receiverInputValue, setReceiverInputValue] = useState(null);
  const [transferInputValue, setTransferInputValue] = useState(null);

  const handleReceiverChange = (e) => {
    setReceiverInputValue(e.target.value);
  };
  const handleTransferChange = (e) => {
    setTransferInputValue(e.target.value);
  };

  const transfer = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    try {
      await wethContract.methods
        .transfer(receiverInputValue, web3.utils.toWei(transferInputValue, "ether"))
        .send({ from: account });
      alert("Transfered successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="wethform3">
      <label className="DepoName" >
        Transfer Weth 
        <input className="inpTr" type="text" placeholder="recipient" onChange={handleReceiverChange} /> 
        <input className="inpTr" type="number" placeholder="Weth to send" onChange={handleTransferChange} />
         <button className="BtnTr" onClick={transfer}>Transfer</button>
      </label>
      
    </form>
  );
};

export default TransferWeth;
