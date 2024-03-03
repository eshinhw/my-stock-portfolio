import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStock({
  stocks,
  setStocks,
  newStock,
  setNewStock,
  weight,
  setWeight,
  totalWeight,
  setTotalWeight,
}) {
  function handleOnSubmit(e) {
    e.preventDefault();
    if (newStock === "") {
      toast.error("Please provide ticker symbol");
      setWeight(0);
      return;
    }
    if (weight <= 0 || weight > 100) {
      toast.error("Weight must be between 1 and 100");
      setWeight(0);
      return;
    }

    if (Number(totalWeight) + Number(weight) > 100) {
      toast.error("Total Weight can't be greater than 100");
      setWeight(0);
      return;
    }
    setTotalWeight(Number(totalWeight) + Number(weight));
    setStocks([...stocks, { symbol: newStock, weight: weight }]);
    setNewStock("");
    setWeight(0);
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
          <Form className="grid grid-cols-3 my-auto" onSubmit={handleOnSubmit}>
            <InputGroup className="mb-3 h-full">
              <Form.Control
                placeholder="Stock Symbol"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="ml-2 mb-3 h-full">
              <Form.Control
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
            <Button
              variant="primary"
              className="ml-5 bg-black border-black"
              type="submit"
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default AddStock;
