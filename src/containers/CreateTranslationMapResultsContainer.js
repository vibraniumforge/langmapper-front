import React, { Component } from "react";
import CreateTranslationRow from "../components/CreateTranslationRow.js";

class CreateTranslationMapResultsContainer extends Component {
  render() {
    console.log(this.props);
    const translations =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <CreateTranslationRow
                key={translation.t_id}
                translation={translation}
                onHandleEdit={this.props.onHandleEdit}
              />
            );
          })
        : null;

    return (
      <>
        {/* <h3>Location: {this.props.searchedLocation}</h3>
        <h3>Word: {this.props.searchedWord}</h3> */}
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

export default CreateTranslationMapResultsContainer;
