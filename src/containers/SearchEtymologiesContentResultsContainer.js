import React, { Component } from "react";
import SearchEtymologiesContentResultCard from "../components/SearchEtymologiesContentResultCard.js";

class SearchEtymologiesContentResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByEtymology &&
      this.props.searchedTranslationsByEtymology.length > 0
        ? this.props.searchedTranslationsByEtymology.map((translation) => {
            return (
              <SearchEtymologiesContentResultCard
                translation={translation}
                key={translation.id}
              />
            );
          })
        : null;

    return (
      <>
        <h3>Search Term: {this.props.selectedWord}</h3>
        {this.props.searchedWord && this.props.results.length === 0 ? (
          <h6>No results found</h6>
        ) : null}
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchEtymologiesContentResultsContainer;
