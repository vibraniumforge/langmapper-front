import React from "react";
import SearchTranslationsByAreaResultsContainer from "./SearchTranslationsByAreaResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  getTranslationById,
  //   clearGetTranslationById,
  //   editTranslation,
  deleteTranslation,
  searchTranslationsByArea,
  //   clearSearchTranslationsByArea,
  getSearchArea,
  //   clearSearchArea,
  getSearchWord,
  //   clearSearchWord,
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
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
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
    const allWords =
      this.props.words && this.props.words.length > 0
        ? this.props.words.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    const allAreas =
      this.props.languageAreaNames && this.props.languageAreaNames.length > 0
        ? this.props.languageAreaNames.map((area, index) => {
            return area ? <option key={index}>{area}</option> : null;
          })
        : null;

    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedArea"
            value={this.state.selectedArea}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Area</option>
            {allAreas}
          </select>
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
            className={
              this.state.selectedArea && this.state.selectedWord
                ? "submit-btn"
                : "disabled"
            }
            disabled={!this.state.selectedArea || !this.state.selectedWord}
          />
        </form>

        <SearchTranslationsByAreaResultsContainer
          searchedTranslationsByArea={this.props.searchedTranslationsByArea}
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  words: state.words.words,
  languageAreaNames: state.languages.languageAreaNames,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getAllLanguageAreaNames,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByArea,
      getSearchArea,
      getSearchWord,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByArea)
);
