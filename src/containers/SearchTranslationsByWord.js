import React from "react";
import SearchTranslationsByWordResultsContainer from "./SearchTranslationsByWordResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getTranslationById,
  deleteTranslation,
  searchTranslationsByWord,
} from "../actions/translationActions.js";

import { getWords } from "../actions/wordActions.js";

class SearchTranslationsByWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      results: [],
      searchedWord: "",
      allWords: [],
    };
  }

  componentDidMount() {
    if (this.props.words.length === 0) {
      this.props.getWords();
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    this.props.getTranslationById(translationId);
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  onHandleDelete = (e, languageId) => {
    e.preventDefault();
    this.props.deleteTranslation(languageId);
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.searchTranslationsByWord(this.state.selectedWord);
    this.setState({ searchedWord: this.state.selectedWord, selectedWord: "" });
  };

  render() {
    const allWords =
      this.props.words && this.props.words.length > 0
        ? this.props.words.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedWord"
            value={this.state.selectedWord}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Word</option>
            {allWords}
          </select>
          <input
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled"}
            disabled={!this.state.selectedWord}
          />
        </form>
        <SearchTranslationsByWordResultsContainer
          searchedTranslationsByWord={this.props.searchedTranslationsByWord}
          searchedWord={this.state.searchedWord}
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchedTranslationsByWord: state.translations.searchedTranslationsByWord,
  words: state.words.words,
  translationToUpdate: state.translations.translationToUpdate,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByWord,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByWord)
);
