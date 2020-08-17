import React, { Component } from "react";
import SearchTranslationsByMacrofamilyResultCard from "../components/SearchTranslationsByMacrofamilyResultCard.js";

class SearchTranslationsByMacrofamilyResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByMacrofamily &&
      this.props.searchedTranslationsByMacrofamily.length > 0
        ? this.props.searchedTranslationsByMacrofamily.map((translation) => {
            return (
              <SearchTranslationsByMacrofamilyResultCard
                key={translation.id}
                translation={translation}
                onHandleDelete={this.props.onHandleDelete}
                onHandleEdit={this.props.onHandleEdit}
              />
            );
          })
        : null;

    return (
      <>
        {this.props.searchedMacrofamily.length > 0 ? (
          <div id="card-container">{cards}</div>
        ) : null}
      </>
    );
  }
}

export default SearchTranslationsByMacrofamilyResultsContainer;
