import Weth from "./Weth/Weth";
import WalletCard from "./ConnectWallet";
import Send from "./SendEth/send";
import '../src/index.css'

function App() {
  return (
    <div className="App">
      <WalletCard/>
      <Send/>
      <Weth />
    </div>
  );
}

export default App;
