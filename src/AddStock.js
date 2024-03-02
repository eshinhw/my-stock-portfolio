import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function AddStock({ stocks, setStocks, newStock, setNewStock, showPerf }) {
  function handleOnClick() {
    setStocks([...stocks, newStock]);
    setNewStock("");
  }

  return (
    <>
      {/* Grid Container */}
      <div className="grid grid-cols-2 my-10">
        {/* Left Column */}
        <div className="mx-44">
          <span className="text-2xl font-bold">Add Stock</span>
        </div>
        {/* Right Column */}
        <div className="mr-44">
          <Form className="grid grid-cols-2 my-auto">
            <InputGroup className="mb-3 h-full">
              <Form.Control
                placeholder="Type Stock Symbol"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
              />
            </InputGroup>
            <Button
              variant="primary"
              className="ml-10 bg-black border-black"
              onClick={handleOnClick}
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddStock;
