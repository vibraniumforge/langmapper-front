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
        {this.props.searchedTranslationsByWordGender.length > 0 ? (
          <div id="card-container">{cards}</div>
        ) : null}
      </>
    );
  }
}

export default SearchAllGendersResultsContainer;
