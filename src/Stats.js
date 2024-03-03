import React from "react";

function Stats({ showPerf, startYear, endYear }) {
  return (
    <>
      {showPerf && (
        <div className="my-6 mx-44">
          <span className="text-2xl font-bold">
            Historical Performance ({startYear} - {endYear})
          </span>
        </div>
      )}
    </>
  );
}

export default Stats;
