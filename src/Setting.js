import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Setting({
  balance,
  setBalance,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
}) {
  return (
    // Grid Container
    <div className="grid grid-cols-2 my-10">
      {/* Left Column */}
      <div className="mx-44">
        <span className="text-2xl font-bold">Account Configuration</span>
      </div>
      {/* Right Column */}
      <div className="mr-44">
        <div className="flex flex-col gap-2">
          <InputGroup className="">
            <InputGroup.Text>Account Balance ($)</InputGroup.Text>
            <Form.Control
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="">
            <InputGroup.Text>Start Year</InputGroup.Text>
            <Form.Control
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="">
            <InputGroup.Text>End Year</InputGroup.Text>
            <Form.Control
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

export default Setting;
