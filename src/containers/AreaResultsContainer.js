import React, { Component } from "react";
import ViewAllLanguagesResultCard from "../components/ViewAllLanguagesResultCard.js";

class AreaResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(language => {
            return (
              <ViewAllLanguagesResultCard
                language={language}
                key={language.id}
              />
            );
          })
        : null;

    return (
      <>
        <h3>Location: {this.props.searchedLocation}</h3>
        {this.props.searchedWord && this.props.results.length === 0 ? (
          <h6>No results found</h6>
        ) : null}
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default AreaResultsContainer;
