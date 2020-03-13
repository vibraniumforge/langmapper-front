import React, { Component } from "react";
import TranslationByAreaResultCard from "../components/TranslationByAreaResultCard.js";

class TranslationsByAreaResultsContainer extends Component {
  render() {
    const cards =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <TranslationByAreaResultCard
                translation={translation}
                key={translation.id}
              />
            );
          })
        : null;

    return (
      <>
        <h3>Location: {this.props.searchedLocation}</h3>
        <h3>Word: {this.props.searchedWord}</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default TranslationsByAreaResultsContainer;
