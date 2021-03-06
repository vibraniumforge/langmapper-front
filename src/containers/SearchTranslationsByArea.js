import React from "react";
import SearchTranslationsByAreaResultsContainer from "./SearchTranslationsByAreaResultsContainer.js";
import AreaSearchSelect from "../selects/AreaSearchSelect.js";
import WordSearchSelect from "../selects/WordSearchSelect.js";
// import Spinner from "../components/Spinner.js";
import MiniTable from "../components/MiniTable.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getWordNames,
  getWordDefinition,
  clearGetWordDefinition,
} from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  getTranslationById,
  deleteTranslation,
  searchTranslationsByArea,
  clearSearchTranslationsByArea,
  isLoading,
} from "../actions/translationActions.js";

class SearchTranslationsByArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: "",
      selectedWord: "",
      searchedArea: "",
      searchedWord: "",
    };
  }

  componentDidMount() {
    if (this.props.wordNames && this.props.wordNames.length === 0) {
      this.props.getWordNames();
    }
    if (
      this.props.languageAreaNames &&
      this.props.languageAreaNames.length === 0
    ) {
      this.props.getAllLanguageAreaNames();
    }
    if (this.props.searchedTranslationsByArea.length) {
      this.props.clearSearchTranslationsByArea();
      this.props.clearGetSearchArea();
      this.props.clearGetSearchWord();
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState({
      searchedArea: this.state.selectedArea,
      searchedWord: this.state.selectedWord,
      selectedArea: "",
      selectedWord: "",
    });
    this.props.isLoading();
    this.props.getWordDefinition(this.state.selectedWord);
    this.props.searchTranslationsByArea(
      this.state.selectedArea,
      this.state.selectedWord
    );
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

  render() {
    const allAreas =
      this.props.languageAreaNames && this.props.languageAreaNames.length > 0
        ? this.props.languageAreaNames.map((area, index) => {
            return area ? <option key={index}>{area}</option> : null;
          })
        : null;
    const allWords =
      this.props.wordNames && this.props.wordNames.length > 0
        ? this.props.wordNames.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;

    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <h3>Search all Translations in an Area</h3>
          <AreaSearchSelect
            allAreas={allAreas}
            selectedArea={this.state.selectedArea}
            handleOnChange={this.handleOnChange}
          />
          <WordSearchSelect
            allWords={allWords}
            selectedWord={this.state.selectedWord}
            handleOnChange={this.handleOnChange}
          />
          <input
            type="submit"
            value="Search"
            className={
              this.state.selectedArea && this.state.selectedWord
                ? "submit-btn"
                : "disabled-btn"
            }
            disabled={!this.state.selectedArea && this.state.selectedWord}
          />
        </form>
        {
          this.props.searchedTranslationsByArea &&
          this.props.searchedTranslationsByArea.length > 0 ? (
            <>
              {" "}
              <MiniTable
                searchedArea={this.state.searchedArea}
                searchedWord={this.state.searchedWord}
                wordDefinition={this.props.wordDefinition}
                count={this.props.searchedTranslationsByArea.length}
              />
              <SearchTranslationsByAreaResultsContainer
                searchedTranslationsByArea={
                  this.props.searchedTranslationsByArea
                }
                wordDefinition={this.props.wordDefinition}
                onHandleDelete={this.onHandleDelete}
                onHandleEdit={this.onHandleEdit}
              />
            </>
          ) : null
          //   <Spinner isLoading={this.props.isLoading} />
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  wordNames: state.words.wordNames,
  languageAreaNames: state.languages.languageAreaNames,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
  isLoadingNow: state.translations.isLoading,
  wordDefinition: state.words.wordDefinition,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      getAllLanguageAreaNames,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByArea,
      clearSearchTranslationsByArea,
      isLoading,
      getWordDefinition,
      clearGetWordDefinition,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByArea)
);
