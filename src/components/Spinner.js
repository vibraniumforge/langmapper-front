import React from "react";

const Spinner = (props) => {
  return props.isLoading ? <div className="spinner"></div> : null;
};

export default Spinner;
