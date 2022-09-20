import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import '../Wallet.css';


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Send() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")   
    });
  };

  return (
    <form className="sendForm" onSubmit={handleSubmit}>
      <div className="">
        <main className="">
          <h4 className="sendT">
            Send Eth
          </h4>
          <div className="sendInp">
            
              <input
                type="text"
                name="addr"
                className="inputS"
                placeholder="Recipient Address"
              />
              <input
                name="ether"
                type="text"
                className="inputS"
                placeholder="Amount to send"
              />
            
          </div>
        </main>
        <footer className="">
          <button
            type="submit"
            className="BtnTr"
        
          >
            Pay 
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}