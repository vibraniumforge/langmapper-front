import React from "react";
import SearchTranslationsByAreaResultsContainer from "./SearchTranslationsByAreaResultsContainer.js";
import AreaSearchSelect from "../components/AreaSearchSelect.js";
import WordSearchSelect from "../components/WordSearchSelect.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

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

class SearchTranslationsByArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: "",
      selectedWord: "",
    };
  }

  componentDidMount() {
    if (this.props.words && this.props.words.length === 0) {
      this.props.getWords();
    }
    if (
      this.props.languageAreaNames &&
      this.props.languageAreaNames.length === 0
    ) {
      this.props.getAllLanguageAreaNames();
    }
    if (this.props.searchedTranslationsByArea.length) {
      this.props.clearGetTranslationsByArea();
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
    this.props.isLoading();
    this.props.searchTranslationsByArea(
      this.state.selectedArea,
      this.state.selectedWord
    );

    this.props.getSearchArea(this.state.selectedArea);
    this.props.getSearchWord(this.state.selectedWord);
    this.setState({
      selectedArea: "",
      selectedWord: "",
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

  render() {
    const allAreas =
      this.props.languageAreaNames && this.props.languageAreaNames.length > 0
        ? this.props.languageAreaNames.map((area, index) => {
            return area ? <option key={index}>{area}</option> : null;
          })
        : null;
    const allWords =
      this.props.words && this.props.words.length > 0
        ? this.props.words.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;

    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
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
                : "disabled"
            }
            disabled={!this.state.selectedArea && this.state.selectedWord}
          />
        </form>
        {this.props.searchedTranslationsByArea ? (
          <SearchTranslationsByAreaResultsContainer
            searchedTranslationsByArea={this.props.searchedTranslationsByArea}
            onHandleDelete={this.onHandleDelete}
            onHandleEdit={this.onHandleEdit}
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
  languageAreaNames: state.languages.languageAreaNames,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
  isLoadingNow: state.translations.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getAllLanguageAreaNames,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByArea,
      clearGetTranslationsByArea,
      getSearchArea,
      clearGetSearchArea,
      getSearchWord,
      clearGetSearchWord,
      isLoading,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByArea)
);
