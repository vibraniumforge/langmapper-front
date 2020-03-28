import React, { Component } from "react";
import GroupEtymologyResultCard from "../components/GroupEtymologyResultCard.js";

class SearchEtymologiesGroupedResultsContainer extends Component {
  render() {
    const cards =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map((result, index) => {
            return <GroupEtymologyResultCard key={index} result={result} />;
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
