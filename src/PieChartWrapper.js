import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function PieChartWrapper({ assets }) {
  const [data, setData] = useState([["Symbol", "Weight"]]);

  useEffect(() => {
    let filteredAssets = assets.filter((asset) => asset.weight > 0);
    let myAssets = [];

    for (let i = 0; i < filteredAssets.length; i++) {
      const { symbol, weight } = filteredAssets[i];
      myAssets.push([symbol.toUpperCase(), Number(weight)]);
    }
    setData([...data, ...myAssets]);
  }, []);

  const options = {
    pieHole: 0.4,
    is3D: true,
  };
  return (
    <>
      <p>{data}</p>
      <Chart
        chartType="PieChart"
        width="100%"
        height="250px"
        data={data}
        options={options}
      />
    </>
  );
}

export default PieChartWrapper;
