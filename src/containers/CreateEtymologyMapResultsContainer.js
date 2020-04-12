import React, { Component } from "react";
import CreateEtymologyRow from "../components/CreateEtymologyRow.js";

class CreateEtymologyMapResultsContainer extends Component {
  render() {
    const translations =
      this.props.results && this.props.results.length > 0
        ? this.props.results.map((translation) => {
            return (
              <CreateEtymologyRow
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
              <th>Macrofamily</th>
              <th>Family</th>
              <th>Translation</th>
              <th>Romanization</th>
              <th>Gender</th>
              <th>Etymology</th>
            </tr>
          </thead>
          <tbody>{translations}</tbody>
        </table>
      </>
    );
  }
}

export default CreateEtymologyMapResultsContainer;
