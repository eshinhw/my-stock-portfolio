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
import PieChartWrapper from "./PieChartWrapper";
import GrowthChartWrapper from "./GrowthChartWrapper";
import DrawdownChartWrapper from "./DrawdownChartWrapper";

const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none",
};

const data = [
  ["Age", "Weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7],
];

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
  const [finalBalance, setFinalBalance] = useState(0);
  const [startYear, setStartYear] = useState(1980);
  const [endYear, setEndYear] = useState(new Date().getFullYear());

  const [assets, setAssets] = useState(ASSETS);
  const [totalWeight, setTotalWeight] = useState();

  const [showConfig, setShowConfig] = useState(true);
  const [showPortConstruct, setShowPortConstruct] = useState(true);
  const [showPerf, setShowPerf] = useState(false);

  const [mdd, setMdd] = useState(0);
  const [cagr, setCagr] = useState(0);
  const [portVol, setPortVol] = useState(0);
  const [sharpe, setSharpe] = useState(0);
  const [drawdown, setDrawdown] = useState({});
  const [growth, setGrowth] = useState({});

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
    // Total Weight Validation
    if (totalWeight !== 100) {
      toast.error("Total weight must be equal to 100%.");
      return;
    } else {
      toast.success("Good!");
      setShowPerf(true);
    }

    const filteredAssets = assets
      .filter((asset) => asset.symbol !== "")
      .filter((asset) => asset.weight !== null);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initialBalance: balance,
        startYear: startYear,
        endYear: endYear,
        assets: filteredAssets,
      }),
    };

    fetch("http://127.0.0.1:8000/msp/stats", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMdd(data.mdd);
        setCagr(data.port_cagr);
        setPortVol(data.port_vol);
        setSharpe(data.sharpe);
        setFinalBalance(data.final_bal);
        setDrawdown(data.dd_data);
        setGrowth(data.growth_data);
      });
  }

  useEffect(() => {
    handleTotalWeight();
  }, [assets]);

  return (
    <main className="m-0">
      <Navbar />
      {/* Portfolio Configuration */}
      {showConfig && (
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
                    {generateYears().map((year, idx) => (
                      <option value={year} key={idx}>
                        {year}
                      </option>
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
                    {generateYears().map((year, idx) => (
                      <option value={year} key={idx}>
                        {year}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stock Portfolio */}
      {showPortConstruct && (
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
      )}

      {/* Performance */}
      {showPerf && (
        <section className="mx-44">
          <div className="my-6">
            <span className="text-2xl font-bold">
              Portfolio Analysis Results ({startYear} - {endYear})
            </span>
          </div>
          <div>
            <span className="text-xl font-bold">Portfolio Allocation</span>
            <div className="grid grid-cols-2 mt-10">
              <div className="w-2/3">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets
                      .filter((asset) => asset.weight > 0)
                      .map((asset) => (
                        <tr>
                          <td>{asset.symbol.toUpperCase()}</td>
                          <td>{asset.weight} %</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <div className="w-full h-full">
                <PieChartWrapper assets={assets} />
              </div>
            </div>
          </div>

          <div>
            <div className="my-3">
              <span className="text-xl font-bold">Performance Summary</span>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Portfolio</th>
                  <th>Initial Balance</th>
                  <th>Final Balance</th>
                  <th>CAGR</th>
                  <th>Volatility</th>
                  <th>Max Drawdown</th>
                  <th>Sharpe Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Portfolio 1</td>
                  <td>$ {balance}</td>
                  <td>
                    $ {Math.round((finalBalance + Number.EPSILON) * 100) / 100}
                  </td>
                  <td>
                    {Math.round((cagr * 100 + Number.EPSILON) * 100) / 100} %
                  </td>
                  <td>
                    {Math.round((portVol * 100 + Number.EPSILON) * 100) / 100} %
                  </td>
                  <td>
                    {Math.round((mdd * 100 + Number.EPSILON) * 100) / 100} %
                  </td>
                  <td>{Math.round((sharpe + Number.EPSILON) * 100) / 100}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <span className="text-xl font-bold">Portfolio Growth</span>
            <GrowthChartWrapper
              assets={assets}
              startYear={startYear}
              endYear={endYear}
              balance={balance}
            />
          </div>
          <div>
            <span className="text-xl font-bold">Portfolio Drawdowns</span>
            <DrawdownChartWrapper
              assets={assets}
              startYear={startYear}
              endYear={endYear}
              balance={balance}
            />
          </div>
        </section>
      )}

      <ToastContainer />
    </main>
  );
}

export default App;
