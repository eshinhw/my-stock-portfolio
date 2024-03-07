import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function DrawdownChartWrapper(props) {
  const [data, setData] = useState([["Date", "DD"]]);
  // const data = [
  //   ["Date", "PV"],
  //   ["2013", 1000],
  //   ["2014", 1170],
  //   ["2015", 660],
  //   ["2016", 1030],
  // ];
  useEffect(() => {
    const assets = props.assets.filter((asset) => asset.weight > 0);
    console.log(assets);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initialBalance: props.balance,
        startYear: props.startYear,
        endYear: props.endYear,
        assets: assets,
      }),
    };
    fetch("http://127.0.0.1:8000/msp/portfolio-drawdown", requestOptions)
      .then((response) => response.json())
      .then((gdata) => {
        let myData = [];
        const parsed = JSON.parse(gdata.data);
        for (const key in parsed) {
          let currDate = new Date(Number(key));
          myData.push([currDate, parsed[key]]);
        }
        setData([...data, ...myData]);
      });
  }, []);

  const options = {
    chartArea: { width: "80%", height: "70%" },
    legend: "none",
  };

  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default DrawdownChartWrapper;
