import React from "react";
import SearchTranslationsByWordResultsContainer from "./SearchTranslationsByWordResultsContainer.js";
// import WordSearchSelect from "../selects/WordSearchSelect.js";
import WordNameAutofill from "../selects/WordNameAutofill.js";
import MiniTable from "../components/MiniTable.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getTranslationById,
  searchTranslationsByWord,
  clearSearchTranslationsByWord,
  deleteTranslation,
  isLoading,
} from "../actions/translationActions.js";

import {
  getWordNames,
  getWordDefinition,
  clearGetWordDefinition,
  getSearchWord,
  clearGetSearchWord,
} from "../actions/wordActions.js";

class SearchTranslationsByWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      searchedWord: "",
    };
  }

  componentDidMount() {
    this.props.clearGetWordDefinition();
    if (this.props.wordNames.length === 0) {
      this.props.getWordNames();
    }
    if (this.props.searchedTranslationsByWord.length) {
      this.props.clearSearchTranslationsByWord();
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

  handleOnSubmit = (e, userInput) => {
    e.preventDefault();
    this.props.isLoading();
    this.props.getSearchWord(userInput);
    this.props.searchTranslationsByWord(userInput);
    this.props.getWordDefinition(userInput);
    this.setState({ searchedWord: userInput, selectedWord: "" });
  };

  render() {
    const wordNames =
      this.props.wordNames && this.props.wordNames.length
        ? this.props.wordNames.map((word) => {
            return word.word_name;
          })
        : null;
    // const allWords =
    //   this.props.wordNames && this.props.wordNames.length > 0
    //     ? this.props.wordNames.map((word) => {
    //         return <option key={word.id}>{word.word_name}</option>;
    //       })
    //     : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <h3>Search a Word's Translations in all Languages</h3>
          {/* <WordSearchSelect
            allWords={allWords}
            selectedWord={this.state.selectedWord}
            handleOnChange={this.handleOnChange}
          /> */}
          {/* <input
              type="submit"
              value="Search"
              className={this.state.selectedWord ? "submit-btn" : "disabled-btn"}
              disabled={!this.state.selectedWord}
            /> */}
          <WordNameAutofill
            wordNames={wordNames}
            selectedWord={this.state.selectedWord}
            // handleOnChange={this.handleOnChange}
            handleOnSubmit={this.handleOnSubmit}
          />
        </form>
        {/* {(this.state.searchedWord &&
          this.props.searchedTranslationsByWord.length > 0) ||
        (this.props.searchWord &&
          this.props.searchedTranslationsByWord.length > 0) ? ( */}
        {this.props.searchedTranslationsByWord &&
        this.props.searchedTranslationsByWord.length > 0 ? (
          <>
            <MiniTable
              searchedWord={this.state.searchedWord || this.props.searchedWord}
              wordDefinition={this.props.wordDefinition}
              count={this.props.searchedTranslationsByWord.length}
            />
            <SearchTranslationsByWordResultsContainer
              searchedTranslationsByWord={this.props.searchedTranslationsByWord}
              searchedWord={this.state.searchedWord || this.props.searchWord}
              wordDefinition={this.props.wordDefinition}
              onHandleDelete={this.onHandleDelete}
              onHandleEdit={this.onHandleEdit}
            />
          </>
        ) : this.state.searchedWord ? (
          <Spinner isLoading={this.props.isLoading} />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchedTranslationsByWord: state.translations.searchedTranslationsByWord,
  wordNames: state.words.wordNames,
  translationToUpdate: state.translations.translationToUpdate,
  wordDefinition: state.words.wordDefinition,
  searchedWord: state.words.searchedWord,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      clearSearchTranslationsByWord,
      isLoading,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByWord,
      getWordDefinition,
      clearGetWordDefinition,
      getSearchWord,
      clearGetSearchWord,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByWord)
);
