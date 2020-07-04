import React from "react";

const WordSearchSelect = (props) => {
  return (
    <>
      <select
        id="select"
        name="selectedWord"
        value={props.selectedWord}
        onChange={props.handleOnChange}
      >
        <option value="">Select Word</option>
        {props.allWords}
      </select>
    </>
  );
};

export default WordSearchSelect;
