import React, { Component } from "react";
import SearchTranslationsByMacrofamilyResultCard from "../components/SearchTranslationsByMacrofamilyResultCard.js";

class SearchTranslationsByMacrofamilyResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByMacrofamily &&
      this.props.searchedTranslationsByMacrofamily.length > 0
        ? this.props.searchedTranslationsByMacrofamily.map(
            (translation, index) => {
              return (
                <SearchTranslationsByMacrofamilyResultCard
                  key={index}
                  translation={translation}
                />
              );
            }
          )
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
