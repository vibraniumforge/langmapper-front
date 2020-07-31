import React, { Component } from "react";
import ViewAllWordsResultsContainer from "./ViewAllWordsResultsContainer.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getWords,
  getWordById,
  createWord,
  deleteWord,
  clearGetWords,
} from "../actions/wordActions.js";

import { isLoading } from "../actions/translationActions.js";

class ViewAllWords extends Component {
  componentDidMount() {
    // if (this.props.words && this.props.words.length === 0) {
    //   this.props.getWords();
    // }
    this.props.getWords();
    // this.props.isLoading();
  }

  onHandleClick = (e) => {
    e.preventDefault();
    this.props.clearGetWords();
    this.props.getWords();
  };

  onHandleDelete = (e, wordId) => {
    e.preventDefault();
    this.props.deleteWord(wordId);
  };

  onHandleEdit = (e, wordId) => {
    e.preventDefault();
    this.props.getWordById(wordId);
    this.props.history.push(`/edit_word/${wordId}`);
  };

  render() {
    return (
      <>
        {this.props.loggedIn ? (
          <form onSubmit={(e) => this.onHandleClick(e)}>
            <input
              className="submit-btn"
              type="submit"
              id="submit"
              value="Refresh"
            />
          </form>
        ) : null}
        {this.props.words.length > 0 ? (
          <ViewAllWordsResultsContainer
            onHandleDelete={this.onHandleDelete}
            onHandleEdit={this.onHandleEdit}
            words={this.props.words}
          />
        ) : (
          <Spinner isLoading={this.props.isLoading} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  words: state.words.words,
  loggedIn: state.users.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getWordById,
      createWord,
      deleteWord,
      isLoading,
      clearGetWords,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllWords)
);
