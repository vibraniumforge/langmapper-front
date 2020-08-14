import React, { Component } from "react";
import SearchEtymologiesContentResultCard from "../components/SearchEtymologiesContentResultCard.js";

class SearchEtymologiesContentResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByEtymology &&
      this.props.searchedTranslationsByEtymology.length > 0
        ? this.props.searchedTranslationsByEtymology.map((translation) => {
            return (
              <SearchEtymologiesContentResultCard
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
        <h3>
          Search Term: "{this.props.searchedWord}" (
          {this.props.searchedTranslationsByEtymology.length})
        </h3>
        {this.props.searchedWord &&
        !this.props.isLoadingNow &&
        this.props.searchedTranslationsByEtymology &&
        this.props.searchedTranslationsByEtymology.length === 0 ? (
          <h3>No results found</h3>
        ) : (
          <div id="card-container">{cards}</div>
        )}
      </>
    );
  }
}

export default SearchEtymologiesContentResultsContainer;
