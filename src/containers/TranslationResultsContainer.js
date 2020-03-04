import React, { Component } from "react";
import TranslationResultCard from "../components/TranslationResultCard.js";

class TranslationResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <TranslationResultCard
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

export default TranslationResultsContainer;