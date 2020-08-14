import React, { Component } from "react";
import SearchAllGendersResultCard from "../components/SearchAllGendersResultCard.js";

class SearchAllGendersResultsContainer extends Component {
  render() {
    const cards =
      this.props.searchedTranslationsByWordGender &&
      this.props.searchedTranslationsByWordGender.length > 0
        ? this.props.searchedTranslationsByWordGender.map((translation) => {
            return (
              <SearchAllGendersResultCard
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
        {this.props.searchedTranslationsByWordGender.length > 0 &&
        this.props.definition.length > 0 ? (
          //   <div>
          //     <h3>Word: {this.props.searchedWord}</h3>
          //     <h3>Definition: {this.props.definition}</h3>
          //   </div>
          <table id="table-title">
            <thead>
              <tr>
                <th>Word</th>
                <th>Definition</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.searchedWord}</td>
                <td>{this.props.definition}</td>
                <td>{this.props.searchedTranslationsByWordGender.length}</td>
              </tr>
            </tbody>
          </table>
        ) : null}

        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default SearchAllGendersResultsContainer;
