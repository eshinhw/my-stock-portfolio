import { useState, useEffect } from "react";
import Navbar from "./Navbar";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

import { Typeahead } from "react-bootstrap-typeahead";
import SP500 from "./json/sp500_symbols.json";
import Table from "react-bootstrap/Table";

import generateYears from "./years";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [balance, setBalance] = useState(10000);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [stocks, setStocks] = useState([]);
  const [weight, setWeight] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [showPerf, setShowPerf] = useState(false);

  // async function retrieveStockName(symbol) {
  //   const resp = await fetch(`http://127.0.0.1:8000/msp/stocks/${symbol}`);
  //   if (!resp.ok) {
  //     throw new Error("Network error!");
  //   }

  //   const data = await resp.json();
  //   return data["name"];
  // }

  // function handleOnSubmit(e) {
  //   e.preventDefault();
  //   const newSymbol = newStock[0];

  //   if (weight <= 0 || weight > 100 || typeof weight !== "number") {
  //     toast.error("Weight must be between 1 and 100");
  //     setWeight(0);
  //     return;
  //   }

  //   if (Number(totalWeight) + Number(weight) > 100) {
  //     toast.error("Total Weight can't be greater than 100");
  //     setWeight(0);
  //     return;
  //   }

  //   retrieveStockName(newSymbol).then((name) =>
  //     setStocks([...stocks, { symbol: newSymbol, name: name, weight: weight }])
  //   );
  //   setTotalWeight(Number(totalWeight) + Number(weight));
  //   setNewStock([]);
  //   setWeight(0);
  // }

  // async function fetchData() {
  //   const resp = await fetch(`http://127.0.0.1:8000/msp/stats/${stocks}`);
  //   if (!resp.ok) {
  //     throw new Error("Fetch failed");
  //   }

  //   const data = await resp.json();
  //   return data;
  // }

  // useEffect(() => {
  //   console.log(stocks);
  //   if (stocks.length > 0) {
  //     fetchData().then((data) => console.log(data));
  //   }
  // });

  return (
    <main className="m-0">
      <Navbar />
      {/* Portfolio Configuration */}
      <section className="mx-44">
        {/* Heading */}
        <div className="my-10">
          <p className="text-2xl font-bold ">Portfolio Configuration</p>
        </div>
        {/* Configuration Setting */}
        <div className="my-10">
          <div className="flex flex-col gap-1 align-middle">
            <div className="flex justify-between align-middle">
              <p className="font-bold text-lg">Initial Balance ($)</p>
              <div>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </div>
            </div>
            <div className="flex justify-between align-middle">
              <p className="font-bold text-lg">Start Year</p>
              <div className="w-64">
                <Form.Select aria-label="Default select example">
                  {generateYears().map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="flex justify-between align-middle">
              <p className="font-bold text-lg">End Year</p>
              <div className="w-64">
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={new Date().getFullYear()}
                >
                  {generateYears().map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Portfolio */}
      <section className="mx-44">
        <div className="my-6">
          <span className="text-2xl font-bold">Portfolio</span>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>Portfolio Assets</th>
              <th>Weights</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
              <tr>
                <td>
                  <div className="flex justify-between">
                    <p className="my-1">Asset {num}</p>
                    <Typeahead
                      id="symbol-input"
                      className="my-1 h-full"
                      placeholder="Ticker Symbol"
                      labelKey="label"
                      options={SP500}
                      // onChange={(selected) => setSelectedOption(selected)}
                    />
                  </div>
                </td>
                <td>
                  <InputGroup className="my-1 h-full">
                    <Form.Control
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>
                <InputGroup className="my-1 h-full">
                  <Form.Control disabled value={weight} />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </th>
            </tr>
          </tfoot>
        </Table>
        <div className="flex justify-center">
          <Button
            variant="primary"
            className="bg-black border-black px-10 h-16 w-72 mt-1 mb-10"
            onClick={() => setShowPerf(!showPerf)}
          >
            Analyze Portfolio
          </Button>
        </div>
      </section>
      {/* Performance */}
      <section>
        {showPerf && (
          <div className="my-6 mx-44">
            <span className="text-2xl font-bold">
              Portfolio Analysis Results ({startYear} - {endYear})
            </span>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
