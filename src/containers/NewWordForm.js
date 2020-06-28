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
    const { wordName } = this.state;
    this.props.createWord(wordName);
    this.props.history.push("/all_words");
  };

  clearForm = () => {
    this.setState({ wordName: "" });
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <label htmlFor="word-name">New Word: </label>
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
              this.state.wordName.length > 0 ? "submit-btn" : "disabled"
            }
            disabled={!this.state.wordName.length === 0}
          />
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createWord }, dispatch);
};

export default withRouter(connect(null, mapDispatchToProps)(NewWordForm));