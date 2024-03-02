import React from "react";

function Stats({ showPerf }) {
  return (
    <>
      {console.log(showPerf)}
      {showPerf && (
        <div className="my-6 mx-44">
          <span className="text-2xl font-bold">Historical Performance</span>
        </div>
      )}
    </>
  );
}

export default Stats;
