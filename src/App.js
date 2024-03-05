import { useState, useEffect } from "react";

import Navbar from "./Navbar";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

import SP500 from "./json/sp500_symbols.json";
import Table from "react-bootstrap/Table";

import generateYears from "./years";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { SlMagnifier } from "react-icons/sl";

const ASSETS = [
  {
    id: 1,
    symbol: "",
    weight: null,
  },
  {
    id: 2,
    symbol: "",
    weight: null,
  },
  {
    id: 3,
    symbol: "",
    weight: null,
  },
  {
    id: 4,
    symbol: "",
    weight: null,
  },
  {
    id: 5,
    symbol: "",
    weight: null,
  },
];

function App() {
  const [balance, setBalance] = useState(10000);
  const [startYear, setStartYear] = useState(1980);
  const [endYear, setEndYear] = useState(new Date().getFullYear());

  const [assets, setAssets] = useState(ASSETS);
  const [totalWeight, setTotalWeight] = useState();

  const [showPerf, setShowPerf] = useState(false);

  function handleAssetSymbol(e, id) {
    let result = [...assets];
    result = result.map((x) => {
      if (x.id === id) x.symbol = e.target.value;
      return x;
    });
    setAssets(result);
  }

  function handleAssetWeight(e, id) {
    let result = [...assets];
    result = result.map((x) => {
      if (x.id === id) x.weight = e.target.value;
      return x;
    });
    setTotalWeight(totalWeight + e.target.value);
    setAssets(result);
  }

  function handleTotalWeight() {
    const totalWeight = ASSETS.reduce((n, { weight }) => n + Number(weight), 0);
    setTotalWeight(totalWeight);
  }

  function handleAnalyzePortfolioSubmit() {
    // Input Validation: Provide both symbol and corresponding weight
    for (var i = 0; i < assets.length; i++) {
      let currAsset = assets[i];
      let currSymbol = currAsset.symbol.toUpperCase();
      if (currSymbol !== "" && currAsset.weight === null) {
        toast.error("Provide corresponding weight.");
        break;
      } else if (currSymbol === "" && currAsset.weight !== null) {
        toast.error("Provide corresponding ticker symbol.");
        break;
      } else if (currSymbol !== "" && !SP500.includes(currSymbol)) {
        toast.error("Provided ticker symbol is not in S&P500.");
        break;
      }
    }

    if (totalWeight !== 100) {
      toast.error("Total weight must be equal to 100%.");
      return;
    } else {
      toast.success("Good!");
      setShowPerf(true);
    }
  }

  useEffect(() => {
    handleTotalWeight();
  }, [assets]);

  return (
    <main className="m-0">
      <Navbar />
      {/* Portfolio Configuration */}
      <section className="mx-44">
        {/* Heading */}
        <div className="my-10">
          <p className="text-2xl font-bold ">Account Configuration</p>
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
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setStartYear(e.target.value)}
                  defaultValue={1980}
                >
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
                  onChange={(e) => setEndYear(e.target.value)}
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
          <span className="text-2xl font-bold">Portfolio Construction</span>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>Portfolio Assets</th>
              <th>Weights</th>
            </tr>
          </thead>
          <tbody>
            {ASSETS.map((asset) => (
              <tr>
                <td>
                  <div className="flex justify-between">
                    <p className="my-1">Asset {asset.id}</p>

                    <InputGroup className="my-1 h-full w-2/5">
                      <Form.Control
                        placeholder="Ticker Symbol"
                        onChange={(e) => handleAssetSymbol(e, asset.id)}
                      />
                      <InputGroup.Text>
                        <SlMagnifier />
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                </td>
                <td>
                  <InputGroup className="my-1 h-full">
                    <Form.Control
                      onChange={(e) => handleAssetWeight(e, asset.id)}
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
                  <Form.Control disabled value={totalWeight} />
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
            onClick={handleAnalyzePortfolioSubmit}
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

      <ToastContainer />
    </main>
  );
}

export default App;
