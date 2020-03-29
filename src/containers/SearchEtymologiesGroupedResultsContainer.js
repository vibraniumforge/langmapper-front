import React, { Component } from "react";
import SearchEtymologiesGroupedResultCard from "../components/SearchEtymologiesGroupedResultCard.js";

class SearchEtymologiesGroupedResultsContainer extends Component {
  render() {
    const cards =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map((result, index) => {
            return (
              <SearchEtymologiesGroupedResultCard key={index} result={result} />
            );
          })
        : null;

    return (
      <>
        <h3>Word: {this.props.searchedWord}</h3>
        <h3>Family: {this.props.searchedFamily}</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchEtymologiesGroupedResultsContainer;
