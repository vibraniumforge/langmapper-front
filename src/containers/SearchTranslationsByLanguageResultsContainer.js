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
        {this.props.searchedTranslationsByLanguage.length > 0 ? (
          <div id="card-container">{cards}</div>
        ) : null}
      </>
    );
  }
}

export default SearchTranslationsByLanguageResultsContainer;
