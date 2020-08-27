import React, { Component } from "react";
import CreateGenderRow from "../components/CreateGenderRow.js";
import { connect } from "react-redux";

class CreateGenderMapResultsContainer extends Component {
  render() {
    const translations =
      this.props.searchedTranslationsByArea &&
      this.props.searchedTranslationsByArea.length > 0
        ? this.props.searchedTranslationsByArea.map((translation) => {
            if (translation.gender) {
              return (
                <CreateGenderRow
                  key={translation.id}
                  translation={translation}
                  onHandleEdit={this.props.onHandleEdit}
                  onHandleDelete={this.props.onHandleDelete}
                />
              );
            } else {
              return null;
            }
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
              {/* <th>Macrofamily</th> */}
              <th>Family</th>
              <th>Translation</th>
              {/* <th>Romanization</th> */}
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

export default connect(mapStateToProps, null)(CreateGenderMapResultsContainer);
