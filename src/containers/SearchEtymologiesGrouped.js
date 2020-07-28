import React from "react";
import SearchEtymologiesGroupedResultsContainer from "./SearchEtymologiesGroupedResultsContainer.js";
import MacrofamilySearchSelect from "../selects/MacrofamilySearchSelect.js";
import WordSearchSelect from "../selects/WordSearchSelect.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames } from "../actions/wordActions.js";
import { getAllMacrofamilyNames } from "../actions/languageActions.js";
import {
  getTranslationById,
  deleteTranslation,
  searchTranslationsByArea,
  clearSearchTranslationsByArea,
  getSearchArea,
  clearGetSearchArea,
  getSearchWord,
  clearGetSearchWord,
  isLoading,
} from "../actions/translationActions.js";

class SearchEtymologiesGrouped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      searchedWord: "",
      selectedMacrofamily: "",
      searchedMacrofamily: "",
    };
  }

  componentDidMount() {
    if (this.props.wordNames && this.props.wordNames.length === 0) {
      this.props.getWordNames();
    }
    if (
      this.props.macrofamilyNames &&
      this.props.macrofamilyNames.length === 0
    ) {
      this.props.getAllMacrofamilyNames();
      this.props.clearSearchTranslationsByArea();
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("FIRES");
    // this.props.serachWordByMacro(this.state.selectedWord, this.state.selectedFamily)
    this.setState({
      selectedWord: this.state.searchedWord,
      searchedMacrofamily: this.state.selectedMacrofamily,
      searchedWord: "",
      selectedMacrofamily: "",
    });
  };

  render() {
    const allWords =
      this.props.wordNames && this.props.wordNames.length > 0
        ? this.props.wordNames.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    const allMacrofamilies =
      this.props.macrofamilyNames && this.props.macrofamilyNames.length > 0
        ? this.props.macrofamilyNames.map((macrofamily, index) => {
            return macrofamily ? (
              <option key={index}>{macrofamily}</option>
            ) : null;
          })
        : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <WordSearchSelect
            allWords={allWords}
            selectedWord={this.state.selectedWord}
            handleOnChange={this.handleOnChange}
          />{" "}
          <MacrofamilySearchSelect
            allMacrofamilies={allMacrofamilies}
            selectedMacrofamily={this.state.selectedMacrofamily}
            handleOnChange={this.handleOnChange}
          />
          <input
            disabled={
              !this.state.selectedWord && !this.state.selectedMacrofamily
            }
            type="submit"
            value="Search"
            className={
              this.state.selectedWord && this.state.selectedMacrofamily
                ? "submit-btn"
                : "disabled-btn"
            }
          />
        </form>
        <SearchEtymologiesGroupedResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
          searchedFamily={this.state.searchedFamily}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  wordNames: state.words.wordNames,
  macrofamilyNames: state.languages.macrofamilyNames,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
  isLoadingNow: state.translations.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByArea,
      clearSearchTranslationsByArea,
      getSearchArea,
      clearGetSearchArea,
      getSearchWord,
      clearGetSearchWord,
      getAllMacrofamilyNames,
      isLoading,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchEtymologiesGrouped)
);
