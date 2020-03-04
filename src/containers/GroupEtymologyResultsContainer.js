import React, { Component } from "react";
import GroupEtymologyResultCard from "../components/GroupEtymologyResultCard.js";

class GroupEtymologyResultsContainer extends Component {
  render() {
    console.log(this.props);
    const cards =
      this.props.results.length > 0
        ? this.props.results.map((result, index) => {
            return <GroupEtymologyResultCard key={index} result={result} />;
          })
        : null;

    return (
      <div id="card-container">
        <h3>Word: {this.props.searchedWord}</h3>
        {cards}
      </div>
    );
  }
}

export default GroupEtymologyResultsContainer;
