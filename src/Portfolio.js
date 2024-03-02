import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function Portfolio({ stocks, setShowPerf }) {
  return (
    <div className="mx-44">
      <div className="my-6">
        <span className="text-2xl font-bold">Current Portfolio</span>
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company Name</th>
            <th>Portfolio Weight</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr>
              <td>{stock}</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-end">
        <Button
          variant="primary"
          className="bg-black border-black w-1/3 h-10"
          onClick={setShowPerf(true)}
        >
          Calculate Portfolio Performance
        </Button>
      </div>
    </div>
  );
}

export default Portfolio;