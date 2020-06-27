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

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = 'http://localhost:3001/api/v1'
// const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class ViewAllWords extends Component {
  componentDidMount() {
    this.props.getWords();
  }

  onHandleDelete = (e, wordId) => {
    e.preventDefault();
    this.props.deleteWord(wordId);
  };

  onHandleEdit = (e, wordId) => {
    e.preventDefault();
    this.props.getWordById(wordId);
    this.props.history.push(`/edit_word/${wordId}`);
    // this.props.editWord(wordId);
  };

  //   deleteWordFromDom = (res) => {
  //     const wordId = res.data.id;
  //     let wordsAr = [...this.state.results];
  //     let newWordsAr = wordsAr.filter((word) => {
  //       return word.id !== wordId;
  //     });
  //     this.setState({ results: newWordsAr });
  //   };

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
