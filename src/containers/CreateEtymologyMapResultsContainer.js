import React, { Component } from "react";

class SearchTranslationsByAreaResultsContainer extends Component {
  render() {
    const translations =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <tr key={translation.id}>
                <td>{translation.name}</td>
                <td>{translation.translation}</td>
                <td>{translation.romanization}</td>
                <td>{translation.gender}</td>
                <td>
                  {translation.macrofamily === "Indo-European"
                    ? "I.E."
                    : translation.macrofamily}
                </td>
                <td>{translation.family}</td>
                <td>
                  {translation.etymology ? translation.etymology : "None Found"}
                </td>
              </tr>
            );
          })
        : null;

    return (
      <>
        <h3>Location: {this.props.searchedLocation}</h3>
        <h3>Word: {this.props.searchedWord}</h3>
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>Translation</th>
              <th>Romanization</th>
              <th>Gender</th>
              <th>Macrofamily</th>
              <th>Family</th>
              <th>Etymology</th>
            </tr>
          </thead>
          <tbody>{translations}</tbody>
        </table>
      </>
    );
  }
}

export default SearchTranslationsByAreaResultsContainer;
