import React, { Component } from "react";
import EtymologyResultCard from "../components/EtymologyResultCard.js";

class EtymologyResultsContainer extends Component {
  render() {
    console.log(this.props);
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
        : "No results found";

    return (
      <div id="card-container">
        <h3>Query Term: {this.props.searchedWord}</h3>
        {cards}
      </div>
    );
  }
}

export default EtymologyResultsContainer;
