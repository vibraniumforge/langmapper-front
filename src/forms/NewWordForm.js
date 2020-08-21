import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createWord } from "../actions/wordActions.js";

class NewWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordName: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/view_all_words");
    // const newWord = {
    //   word_name: this.state.wordName,
    // };
    this.props.createWord(this.state.wordName.toLowerCase());
  };

  cancelFormAction = () => {
    this.props.history.push("/view_all_words");
    this.setState({ wordName: "" });
  };
  t;
  render() {
    return (
      <div>
        <form id="new-word-form" onSubmit={(e) => this.handleOnSubmit(e)}>
          <h2>Create a New Word</h2>
          <div className="form-row">
            <div className="full-col">
              <label className="same-line" htmlFor="word-name">
                New Word:{" "}
              </label>
              <input
                id="word-name"
                type="text"
                name="wordName"
                placeholder="Enter word here"
                value={this.state.wordName}
                onChange={this.handleOnChange}
              />

              <input
                type="submit"
                value="Submit"
                className={
                  this.state.wordName.length > 0 ? "submit-btn" : "disabled-btn"
                }
                disabled={!this.state.wordName.length === 0}
              />
              <button
                type="button"
                className="cancel-btn"
                onClick={this.cancelFormAction}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createWord }, dispatch);
};

export default withRouter(connect(null, mapDispatchToProps)(NewWordForm));
