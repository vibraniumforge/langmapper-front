import React from "react";
// import AreaSearchSelect from "../components/AreaSearchSelect.js";
// import WordSearchSelect from "../selects/WordSearchSelect.js";
import WordNameAutofill from "../selects/WordNameAutofill.js";

const MapByForm = (props) => {
  <form onSubmit={(e) => this.handleOnSubmit(e)}>
    <h3>Create a Comparitive Etymology Map</h3>
    {/* <AreaSearchSelect
      allAreas="Europe"
      selectedArea={this.state.selectedArea}
      handleOnChange={this.handleOnChange}
    /> */}
    <div>
      <select
        id="select"
        name="selectedArea"
        value={this.props.selectedArea}
        onChange={this.props.handleOnChange}
      >
        <option value="">Select Area</option>
        {/* {allAreas} */}
        <option value="Europe">Europe</option>
      </select>

      {/* <WordSearchSelect
      allWords={allWords}
      selectedWord={this.state.selectedWord}
      handleOnChange={this.handleOnChange}
    /> */}
      <WordNameAutofill
        wordNames={props.wordNames}
        selectedWord={props.selectedWord}
        // handleOnChange={this.handleOnChange}
        handleOnSubmit={props.handleOnSubmit}
      />

      {/* <input
      type="submit"
      value="Search"
      className={
        this.state.selectedArea && this.state.selectedWord
          ? "submit-btn"
          : "disabled-btn"
      }
      disabled={!this.state.selectedArea || !this.state.selectedWord}
    /> */}
    </div>
  </form>;
};

export default MapByForm;
