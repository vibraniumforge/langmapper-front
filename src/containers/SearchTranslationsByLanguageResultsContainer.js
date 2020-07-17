import React, { Component } from "react";
import SearchTranslationsByLanguageResultCard from "../components/SearchTranslationsByLanguageResultCard.js";

class SearchTranslationsByLanguageResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByLanguage &&
      this.props.searchedTranslationsByLanguage.length > 0
        ? this.props.searchedTranslationsByLanguage.map((translation) => {
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
        {this.props.searchedLanguage.length > 0 ? (
          <h3>Language: {this.props.searchedLanguage}</h3>
        ) : null}

        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchTranslationsByLanguageResultsContainer;
