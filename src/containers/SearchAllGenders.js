import React from "react";
import SearchAllGendersResultsContainer from "./SearchAllGendersResultsContainer.js";
// import WordSearchSelect from "../selects/WordSearchSelect.js";
import WordNameAutofill from "../selects/WordNameAutofill.js";
import Spinner from "../components/Spinner.js";
import MiniTable from "../components/MiniTable.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getWordNames,
  getWordDefinition,
  clearGetWordDefinition,
} from "../actions/wordActions.js";

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
      //   selectedWord: "",
      searchedWord: "",
    };
  }

  componentDidMount() {
    if (this.props.wordNames.length === 0) {
      this.props.getWordNames();
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

  //   handleOnSubmit = (e) => {
  //     e.preventDefault();
  //     this.props.clearSearchTranslationsByWordGender();
  //     // this.props.clearGetWordDefinition();
  //     this.props.searchTranslationsByWordGender(this.state.selectedWord);
  //     this.props.getWordDefinition(this.state.selectedWord);
  //     this.setState({
  //       searchedWord: this.state.selectedWord,
  //       selectedWord: "",
  //     });
  //   };

  handleOnSubmit = (e, userInput) => {
    e.preventDefault();
    this.props.searchTranslationsByWordGender(userInput);
    this.setState({
      searchedWord: userInput,
      //   searchedLanguage:
      //     languageName.charAt(0).toUpperCase() + languageName.slice(1),
    });
  };

  render() {
    const wordNames =
      this.props.wordNames && this.props.wordNames.length > 0
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
          <h3>Search a Word's Grammatical Gender in all Languages</h3>
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
            handleOnSubmit={this.handleOnSubmit}
            selectedWord={this.state.selectedWord}
            // handleOnChange={this.handleOnChange}
          />
        </form>

        {this.state.searchedWord &&
        this.props.searchedTranslationsByWordGender.length > 0 ? (
          <>
            <MiniTable
              searchedArea={this.state.searchedArea}
              searchedWord={this.state.searchedWord}
              wordDefinition={this.props.wordDefinition}
              count={this.props.searchedTranslationsByWordGender.length}
            />

            <SearchAllGendersResultsContainer
              searchedTranslationsByWordGender={
                this.props.searchedTranslationsByWordGender
              }
              searchedWord={this.state.searchedWord}
              onHandleDelete={this.onHandleDelete}
              onHandleEdit={this.onHandleEdit}
              definition={this.props.definition}
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
  wordNames: state.words.wordNames,
  searchedTranslationsByWordGender:
    state.translations.searchedTranslationsByWordGender,
  definition: state.words.wordDefinition,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      searchTranslationsByWordGender,
      clearSearchTranslationsByWordGender,
      getTranslationById,
      deleteTranslation,
      getWordDefinition,
      clearGetWordDefinition,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchAllGenders)
);
