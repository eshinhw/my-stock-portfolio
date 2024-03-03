import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Setting from "./Setting";
import AddStock from "./AddStock";
import Portfolio from "./Portfolio";
import Stats from "./Stats";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [balance, setBalance] = useState(10000);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState("");
  const [weight, setWeight] = useState();
  const [totalWeight, setTotalWeight] = useState(0);
  const [showPerf, setShowPerf] = useState(false);

  return (
    <body className="m-0">
      <Navbar />
      <Setting
        balance={balance}
        setBalance={setBalance}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
      />
      <AddStock
        stocks={stocks}
        setStocks={setStocks}
        newStock={newStock}
        setNewStock={setNewStock}
        weight={weight}
        setWeight={setWeight}
        totalWeight={totalWeight}
        setTotalWeight={setTotalWeight}
      />
      <Portfolio
        stocks={stocks}
        setShowPerf={setShowPerf}
        showPerf={showPerf}
        totalWeight={totalWeight}
      />
      <Stats showPerf={showPerf} />
    </body>
  );
}

export default App;
