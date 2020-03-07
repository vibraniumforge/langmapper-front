import React, { Component } from "react";
import EtysByMacrofamilyCard from "../components/EtysByMacrofamilyCard.js";

class EtysByMacrofamilyContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map((result, index) => {
            return <EtysByMacrofamilyCard key={index} result={result} />;
          })
        : null;

    return (
      <>
        <h3>{this.props.searchedFamily}</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default EtysByMacrofamilyContainer;
