import React, { Component } from "react";
import EtymologyResultCard from "../components/EtymologyResultCard.js";

class EtymologyResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <EtymologyResultCard
                translation={translation}
                key={translation.id}
              />
            );
          })
        : null;

    return (
      <>
        <h3>Query Term: {this.props.selectedWord}</h3>
        {this.props.searchedWord && this.props.results.length === 0 ? (
          <h6>No results found</h6>
        ) : null}
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default EtymologyResultsContainer;
