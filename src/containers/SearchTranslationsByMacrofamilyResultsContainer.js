import React, { Component } from "react";
import SearchTranslationsByMacrofamilyResultCard from "../components/SearchTranslationsByMacrofamilyResultCard.js";

class SearchTranslationsByMacrofamilyResultsContainer extends Component {
  render() {
    const cards =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map((result, index) => {
            return (
              <SearchTranslationsByMacrofamilyResultCard
                key={index}
                result={result}
              />
            );
          })
        : null;

    return (
      <>
        <h3>Family: {this.props.searchedFamily}</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchTranslationsByMacrofamilyResultsContainer;
