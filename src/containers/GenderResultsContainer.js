import React, { Component } from "react";
import GenderResultCard from "../components/GenderResultCard.js";

class GenderResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <GenderResultCard
                translation={translation}
                key={translation.id}
              />
            );
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

export default GenderResultsContainer;
