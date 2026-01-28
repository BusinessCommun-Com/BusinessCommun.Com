import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ message }) => {
  return (
    <div className="loading-wrapper">
      <div className="spinner" aria-hidden="true" />
      {message && <div className="loading-message">{message}</div>}
    </div>
  );
};

export default LoadingSpinner;
