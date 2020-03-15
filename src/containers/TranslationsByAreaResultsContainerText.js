import React, { Component } from "react";
import TranslationByAreaTextResultCard from "../components/TranslationByAreaTextResultCard.js";

class TranslationsByAreaResultsContainerText extends Component {
  render() {
    const cards =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map((translation, index) => {
            return (
              <TranslationByAreaTextResultCard
                translation={translation}
                key={index}
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

export default TranslationsByAreaResultsContainerText;
