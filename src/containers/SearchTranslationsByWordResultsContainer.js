import React, { Component } from "react";
import SearchTranslationsByWordResultCard from "../components/SearchTranslationsByWordResultCard.js";

class SearchTranslationsByWordResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByWord &&
      this.props.searchedTranslationsByWord.length > 0
        ? this.props.searchedTranslationsByWord.map((translation) => {
            return (
              <SearchTranslationsByWordResultCard
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
        {(this.props.searchedTranslationsByWord.length > 0 &&
          this.props.wordDefinition.length > 0) ||
        (this.props.searchedWord.length > 0 &&
          this.props.wordDefinition.length > 0) ? (
          <div id="card-container">{cards}</div>
        ) : null}
      </>
    );
  }
}

export default SearchTranslationsByWordResultsContainer;
