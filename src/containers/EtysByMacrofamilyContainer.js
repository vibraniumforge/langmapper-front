import React, { Component } from "react";
import EtysByMacrofamilyCard from "../components/EtysByMacrofamilyCard.js";

class EtysByMacrofamilyContainer extends Component {
  render() {
    console.log(this.props);
    const cards =
      this.props.results.length > 0
        ? this.props.results.map((result, index) => {
            return <EtysByMacrofamilyCard key={index} result={result} />;
          })
        : null;

    return (
      <div id="card-container">
        <h3>Word: {this.props.searchedWord}</h3>
        {cards}
      </div>
    );
  }
}

export default EtysByMacrofamilyContainer;
