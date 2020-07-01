import React, { Component } from "react";
import SearchAllGendersResultCard from "../components/SearchAllGendersResultCard.js";

class SearchAllGendersResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByWordGender &&
      this.props.searchedTranslationsByWordGender.length > 0
        ? this.props.searchedTranslationsByWordGender.map((translation) => {
            return (
              <SearchAllGendersResultCard
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

export default SearchAllGendersResultsContainer;
