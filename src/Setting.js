import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Setting({ balance, setBalance, timePeriod, setTimePeriod }) {
  return (
    // Grid Container
    <div className="grid grid-cols-2 my-10">
      {/* Left Column */}
      <div className="mx-44">
        <span className="text-2xl font-bold">Account Set Up</span>
      </div>
      {/* Right Column */}
      <div className="mr-44">
        <div className="flex flex-col gap-10">
          <InputGroup className="mb-3">
            <InputGroup.Text>Account Balance</InputGroup.Text>
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </InputGroup>
        </div>
        <Form.Select
          aria-label="Default select example"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option>Select Time Period</option>
          <option value="1">1 Year</option>
          <option value="3">3 Years</option>
          <option value="5">5 Years</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default Setting;
