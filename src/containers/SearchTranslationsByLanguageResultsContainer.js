import React, { Component } from "react";
import SearchTranslationsByLanguageResultCard from "../components/SearchTranslationsByLanguageResultCard.js";

class SearchTranslationsByLanguageResultsContainer extends Component {
  render() {
    const cards =
      this.props.translations && this.props.translations.length > 0
        ? this.props.translations.map((translation) => {
            return (
              <SearchTranslationsByLanguageResultCard
                translation={translation}
                key={translation.id}
                onHandleDelete={this.props.onHandleDelete}
                onHandleEdit={this.props.onHandleEdit}
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
