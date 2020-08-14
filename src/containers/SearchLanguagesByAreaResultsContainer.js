import React, { Component } from "react";
import ViewAllLanguagesResultCard from "../components/ViewAllLanguagesResultCard.js";

class SearchLanguagesByAreaResultsContainer extends Component {
  render() {
    const cards =
      this.props.languagesByArea && this.props.languagesByArea.length > 0
        ? this.props.languagesByArea.map((language) => {
            return (
              <ViewAllLanguagesResultCard
                language={language}
                key={language.id}
                onHandleDelete={this.props.onHandleDelete}
                onHandleEdit={this.props.onHandleEdit}
              />
            );
          })
        : null;

    return (
      <>
        {this.props.languagesByArea && this.props.languagesByArea.length ? (
          <h3>
            Area: {this.props.searchedArea} ({this.props.languagesByArea.length}
            )
          </h3>
        ) : null}

        {this.props.searchedWord && this.props.results.length === 0 ? (
          <h6>No results found</h6>
        ) : null}
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchLanguagesByAreaResultsContainer;
