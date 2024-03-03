import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typeahead } from "react-bootstrap-typeahead";
import SP500 from "./sp500_symbols.json";

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
  // const [selectedOption, setSelectedOption] = useState([]);
  function handleOnSubmit(e) {
    e.preventDefault();
    const newSymbol = newStock[0];

    if (weight <= 0 || weight > 100 || typeof weight !== "number") {
      toast.error("Weight must be between 1 and 100");
      setWeight(0);
      return;
    }

    if (Number(totalWeight) + Number(weight) > 100) {
      toast.error("Total Weight can't be greater than 100");
      setWeight(0);
      return;
    }
    setStocks([...stocks, { symbol: newSymbol, weight: weight }]);
    setTotalWeight(Number(totalWeight) + Number(weight));
    // setStocks([...stocks, { symbol: newStock, weight: weight }]);
    setNewStock([]);
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
            <Typeahead
              id="symbol-input"
              className="mb-3 h-full"
              placeholder="Stock Symbol"
              labelKey="label"
              options={SP500}
              selected={newStock}
              // onChange={(selected) => setSelectedOption(selected)}
              onChange={(symbol) => setNewStock(symbol)}
            />
            <InputGroup className="ml-2 mb-3 h-full">
              <Form.Control
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                type="number"
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
