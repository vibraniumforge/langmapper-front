import React, { Component } from "react";
import ViewAllWordsResultsContainer from "./ViewAllWordsResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getWords,
  getWordById,
  createWord,
  deleteWord,
} from "../actions/wordActions.js";

class ViewAllWords extends Component {
  componentDidMount() {
    if (this.props.words.length === 0) {
      this.props.getWords();
    }
  }

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
        <h3>All Words</h3>
        <ViewAllWordsResultsContainer
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
          words={this.props.words}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  words: state.words.words,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getWordById,
      createWord,
      deleteWord,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllWords)
);
