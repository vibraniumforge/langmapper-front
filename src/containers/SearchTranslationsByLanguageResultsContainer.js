import React, { Component } from "react";
import TranslationByLanguageResultCard from "../components/TranslationByLanguageResultCard.js";

class SearchTranslationsByLanguageResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <TranslationByLanguageResultCard
                translation={translation}
                key={translation.id}
              />
            );
          })
        : null;

    return (
      <>
        <h3>Language: {this.props.searchedLanguage}</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchTranslationsByLanguageResultsContainer;
