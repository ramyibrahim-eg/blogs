import React from "react";
import Spinner from "../../img/spinner.gif";

const LoadingSpinnerButton = ({ title, loading, onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-read">
      {loading ? (
        <img src={Spinner} alt="spinner" className="spinners" />
      ) : (
        title + " "
      )}
    </button>
  );
};

export default LoadingSpinnerButton;
