import React, { Component } from "react";
import SearchTranslationsByAreaResultCard from "../components/SearchTranslationsByAreaResultCard.js";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SearchTranslationsByAreaResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByArea &&
      this.props.searchedTranslationsByArea.length > 0
        ? this.props.searchedTranslationsByArea.map((translation) => {
            return (
              <SearchTranslationsByAreaResultCard
                translation={translation}
                key={translation.id}
                onHandleEdit={this.props.onHandleEdit}
                onHandleDelete={this.props.onHandleDelete}
              />
            );
          })
        : null;

    return (
      <>
        {this.props.definition.length > 0 &&
        this.props.searchedTranslationsByArea.length > 0 ? (
          //   <div>
          //     <h3>Area: {this.props.searchArea}</h3>
          //     <h3>Word: {this.props.searchWord}</h3>
          //     <h3>Definition: {this.props.definition}</h3>
          //   </div>
          <table id="table-title">
            <thead>
              <tr>
                <th>Area</th>
                <th>Word</th>
                <th>Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.searchArea}</td>
                <td>{this.props.searchWord}</td>
                <td>{this.props.wordDefinition}</td>
              </tr>
            </tbody>
          </table>
        ) : null}

        <div id="card-container">{cards}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchArea: state.translations.searchArea,
  searchWord: state.translations.searchWord,
  wordDefinition: state.words.wordDefinition,
});

export default withRouter(
  connect(mapStateToProps, null)(SearchTranslationsByAreaResultsContainer)
);
