import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function PieChartWrapper({ assets }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredAssets = assets.filter((asset) => asset.weight > 0);
    for (let i = 0; i < filteredAssets.length; i++) {
      setData((data) => [
        ...data,
        [filteredAssets[i].symbol.toUpperCase(), filteredAssets[i].weight],
      ]);
    }
  }, []);

  // const data = [
  //   ["Symbol", "Weight"],
  //   ["MMM", 50],
  //   ["NVDA", 50],
  // ];
  // const data = [
  //   ["Task", "Hours per Day"],
  //   ["Work", 11],
  //   ["Eat", 2],
  //   ["Commute", 2],
  //   ["Watch TV", 2],
  //   ["Sleep", 7], // CSS-style declaration
  // ];

  const options = {
    pieHole: 0.4,
    is3D: true,
  };
  return (
    <Chart
      chartType="PieChart"
      width="70%"
      height="250px"
      data={data}
      options={options}
    />
  );
}

export default PieChartWrapper;
