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

  const options = {
    pieHole: 0.4,
    is3D: true,
  };
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="250px"
      data={data}
      options={options}
    />
  );
}

export default PieChartWrapper;
