import React, { Component } from "react";
import GenderResultCard from "../components/GenderResultCard.js";

class SearchAllGendersResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <GenderResultCard
                translation={translation}
                key={translation.id}
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
