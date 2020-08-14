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
          <h3>
            Family: {this.props.searchedMacrofamily} (
            {this.props.searchedTranslationsByMacrofamily.length})
          </h3>
        ) : null}
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchTranslationsByMacrofamilyResultsContainer;
