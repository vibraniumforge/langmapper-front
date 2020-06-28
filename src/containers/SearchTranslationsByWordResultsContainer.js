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
        <h3>Word: {this.props.searchedWord}</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchTranslationsByWordResultsContainer;
