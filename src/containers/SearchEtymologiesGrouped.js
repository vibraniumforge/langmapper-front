import React from "react";
import SearchEtymologiesGroupedResultsContainer from "./SearchEtymologiesGroupedResultsContainer.js";
import AreaSearchSelect from "../components/AreaSearchSelect.js";
import WordSearchSelect from "../components/WordSearchSelect.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";

import { getAllMacrofamilyNames } from "../actions/languageActions.js";

import {
  getTranslationById,
  deleteTranslation,
  searchTranslationsByArea,
  clearGetTranslationsByArea,
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
      selectedFamily: "",
      searchedFamily: "",
    };
  }

  componentDidMount() {
    if (this.props.words && this.props.words.length === 0) {
      this.props.getWords();
    }
    if (
      this.props.macrofamilyNames &&
      this.props.macrofamilyNames.length === 0
    ) {
      this.props.getAllMacrofamilyNames();
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    // this.props.serachWordByMacro(this.state.selectedWord, this.state.selectedFamily)
  };

  render() {
    const allWords =
      this.props.words.length > 0
        ? this.props.words.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    const macrofamilies =
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
          />

          <select
            id="select"
            name="selectedFamily"
            value={this.state.selectedFamily}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Macrofamily</option>
            {macrofamilies}
          </select>
          <input
            disabled={!this.state.selectedWord}
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled"}
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
  words: state.words.words,
  macrofamilyNames: state.languages.macrofamilyNames,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
  isLoadingNow: state.translations.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByArea,
      clearGetTranslationsByArea,
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
