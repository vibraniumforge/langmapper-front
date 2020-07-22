import React, { Component } from "react";
import CreateEtymologyRow from "../components/CreateEtymologyRow.js";
import { connect } from "react-redux";

class CreateEtymologyMapResultsContainer extends Component {
  render() {
    const translations =
      this.props.searchedTranslationsByArea &&
      this.props.searchedTranslationsByArea.length > 0
        ? this.props.searchedTranslationsByArea.map((translation) => {
            return (
              <CreateEtymologyRow
                key={translation.id}
                translation={translation}
                onHandleEdit={this.props.onHandleEdit}
              />
            );
          })
        : null;

    return (
      <>
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
              <th>Link</th>
              {this.props.loggedIn ? <th>Buttons</th> : null}
            </tr>
          </thead>
          <tbody>{translations}</tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

export default connect(
  mapStateToProps,
  null
)(CreateEtymologyMapResultsContainer);
