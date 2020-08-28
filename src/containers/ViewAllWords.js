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
  getWordDefinition,
  getSearchWord,
  clearGetSearchWord,
} from "../actions/wordActions.js";

import {
  isLoading,
  searchTranslationsByWord,
} from "../actions/translationActions.js";

class ViewAllWords extends Component {
  componentDidMount() {
    // if (this.props.words && this.props.words.length === 0) {
    //   this.props.getWords();
    // }
    this.props.clearGetWords();
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

  onHandleSubmit = (e, wordName) => {
    e.preventDefault();
    this.props.searchTranslationsByWord(wordName);
    this.props.getWordDefinition(wordName);
    this.props.getSearchWord(wordName);
    this.props.history.push(`/search_all_translations_by_word`);
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
            onHandleSubmit={this.onHandleSubmit}
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
      searchTranslationsByWord,
      getWordDefinition,
      getSearchWord,
      clearGetSearchWord,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllWords)
);
