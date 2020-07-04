import React from "react";

const AreaSearchSelect = (props) => {
  return (
    <>
      <select
        id="select"
        name="selectedArea"
        value={props.selectedArea}
        onChange={props.handleOnChange}
      >
        <option value="">Select Area</option>
        {props.allAreas}
      </select>
    </>
  );
};

export default AreaSearchSelect;
