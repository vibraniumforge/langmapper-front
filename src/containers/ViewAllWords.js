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
  isLoading,
} from "../actions/wordActions.js";

class ViewAllWords extends Component {
  componentDidMount() {
    // if (this.props.words && this.props.words.length === 0) {
    //   this.props.getWords();
    // }
    this.props.getWords();
    this.props.isLoading();
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
    console.log(this.props.isLoadingState);
    return !this.props.isLoadingState ? (
      <>
        <h3>All Words</h3>
        <ViewAllWordsResultsContainer
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
          words={this.props.words}
        />
      </>
    ) : (
      <Spinner isLoading={this.props.isLoading} />
    );
  }
}

const mapStateToProps = (state) => ({
  words: state.words.words,
  isLoadingState: state.words.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getWordById,
      createWord,
      deleteWord,
      isLoading,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllWords)
);
