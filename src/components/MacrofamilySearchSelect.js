import React from "react";

const MacrofamilySearchSelect = (props) => {
  return (
    <>
      <select
        id="select"
        name="selectedMacrofamily"
        value={props.selectedMacrofamily}
        onChange={props.handleOnChange}
      >
        <option value="">Select Macrofamily</option>
        {props.allMacrofamilies}
      </select>
    </>
  );
};

export default MacrofamilySearchSelect;
