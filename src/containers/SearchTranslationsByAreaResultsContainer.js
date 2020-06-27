import React, { Component } from "react";
import SearchTranslationsByAreaResultCard from "../components/SearchTranslationsByAreaResultCard.js";

class SearchTranslationsByAreaResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByArea &&
      this.props.searchedTranslationsByArea.length > 0
        ? this.props.searchedTranslationsByArea.map((translation) => {
            return (
              <SearchTranslationsByAreaResultCard
                translation={translation}
                key={translation.id}
                onHandleEdit={this.props.onHandleEdit}
                onHandleDelete={this.props.onHandleDelete}
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

export default SearchTranslationsByAreaResultsContainer;
