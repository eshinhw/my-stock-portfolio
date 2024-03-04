import { useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import AddStock from "./AddStock";
import Portfolio from "./Portfolio";
import Stats from "./Stats";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [balance, setBalance] = useState(10000);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState("");
  const [weight, setWeight] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [showPerf, setShowPerf] = useState(false);

  return (
    <div className="m-0">
      <Navbar />
      <div className="grid grid-cols-2 my-10">
        {/* Left Column */}
        <div className="mx-44">
          <span className="text-2xl font-bold">Portfolio Configuration</span>
        </div>
        {/* Right Column */}
        <div className="mr-44">
          <div className="flex flex-col gap-2">
            <InputGroup className="">
              <InputGroup.Text>Account Balance ($)</InputGroup.Text>
              <Form.Control
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="">
              <InputGroup.Text>Start Year</InputGroup.Text>
              <Form.Control
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="">
              <InputGroup.Text>End Year</InputGroup.Text>
              <Form.Control
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </div>
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
      <Stats showPerf={showPerf} startYear={startYear} endYear={endYear} />
    </div>
  );
}

export default App;
