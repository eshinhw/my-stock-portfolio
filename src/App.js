import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Setting from "./Setting";
import AddStock from "./AddStock";
import Portfolio from "./Portfolio";
import Stats from "./Stats";

function App() {
  const [balance, setBalance] = useState(0);
  const [timePeriod, setTimePeriod] = useState(1);
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState("");
  const [showPerf, setShowPerf] = useState(false);
  useEffect(() => {
    setShowPerf(false);
  }, []);

  return (
    <body className="m-0">
      <Navbar />
      <Setting
        balance={balance}
        setBalance={setBalance}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />
      <AddStock
        stocks={stocks}
        setStocks={setStocks}
        newStock={newStock}
        setNewStock={setNewStock}
      />
      <Portfolio stocks={stocks} setShowPerf={setShowPerf} />
      <Stats showPerf={showPerf} />
    </body>
  );
}

export default App;
