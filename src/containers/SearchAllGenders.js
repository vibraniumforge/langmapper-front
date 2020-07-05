import React from "react";
import SearchAllGendersResultsContainer from "./SearchAllGendersResultsContainer.js";
import WordSearchSelect from "../components/WordSearchSelect.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";

import {
  searchTranslationsByWordGender,
  clearSearchTranslationsByWordGender,
  getTranslationById,
  deleteTranslation,
} from "../actions/translationActions.js";

class SearchAllGenders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      searchedWord: "",
    };
  }

  componentDidMount() {
    if (this.props.words.length === 0) {
      this.props.getWords();
    }
    if (this.props.searchedTranslationsByWordGender.length) {
      this.props.clearSearchTranslationsByWordGender();
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

  onHandleDelete = (e, translationId) => {
    e.preventDefault();
    this.props.deleteTranslation(translationId);
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.searchTranslationsByWordGender(this.state.selectedWord);
    this.setState({
      searchedWord: this.state.selectedWord,
      selectedWord: "",
    });
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
          <WordSearchSelect
            allWords={allWords}
            selectedWord={this.state.selectedWord}
            handleOnChange={this.handleOnChange}
          />
          <input
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled"}
            disabled={!this.state.selectedWord}
          />
        </form>
        {this.state.searchedWord &&
        this.props.searchedTranslationsByWordGender ? (
          <SearchAllGendersResultsContainer
            searchedTranslationsByWordGender={
              this.props.searchedTranslationsByWordGender
            }
            searchedWord={this.state.searchedWord}
            onHandleDelete={this.onHandleDelete}
            onHandleEdit={this.onHandleEdit}
          />
        ) : this.state.searchedWord ? (
          <Spinner isLoading={this.props.isLoading} />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  words: state.words.words,
  searchedTranslationsByWordGender:
    state.translations.searchedTranslationsByWordGender,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      searchTranslationsByWordGender,
      clearSearchTranslationsByWordGender,
      getTranslationById,
      deleteTranslation,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchAllGenders)
);
