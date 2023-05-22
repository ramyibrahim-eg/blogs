import React from "react";

const Spinner = () => {
  return (
    <div className="container-fluid text-center">
      <div className="spinner-border text-primary mt-5 spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
