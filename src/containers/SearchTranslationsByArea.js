import React from "react";
import SearchTranslationsByAreaResultsContainer from "./SearchTranslationsByAreaResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";

import { getAllLanguageAreas } from "../actions/languageActions.js";

import {
  getTranslationById,
  clearGetTranslationById,
  editTranslation,
  deleteTranslation,
  searchTranslationsByArea,
  clearSearchTranslationsByArea,
} from "../actions/translationActions.js";

class SearchTranslationsByArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "",
      selectedWord: "",
      allWords: [],
      allLocations: [],
      results: [],
      searchedWord: "",
      searchedLocation: "",
    };
  }

  componentDidMount() {
    // this.props.clearGetTranslationById();
    // this.props.clearSearchTranslationsByArea();
    if (this.props.words.length === 0) {
      this.props.getWords();
    }
    if (this.props.languageAreaNames.length === 0) {
      this.props.getAllLanguageAreas();
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
      this.state.selectedLocation,
      this.state.selectedWord
    );
    this.setState({
      searchedLocation: this.state.selectedLocation,
      searchedWord: this.state.selectedWord,
      selectedLocation: "",
      selectedWord: "",
    });
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    if (this.props.searchedTranslationsByArea.length === 0) {
      this.props.getTranslationById(translationId);
    }
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
    const allLocations =
      this.props.languageAreaNames && this.props.languageAreaNames.length > 0
        ? this.props.languageAreaNames.map((location, index) => {
            return location ? <option key={index}>{location}</option> : null;
          })
        : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedLocation"
            value={this.state.selectedLocation}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Location</option>
            {allLocations}
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
              this.state.selectedLocation && this.state.selectedWord
                ? "submit-btn"
                : "disabled"
            }
            disabled={!this.state.selectedLocation || !this.state.selectedWord}
          />
        </form>

        <SearchTranslationsByAreaResultsContainer
          searchedTranslationsByArea={this.props.searchedTranslationsByArea}
          searchedWord={this.state.searchedWord}
          searchedLocation={this.state.searchedLocation}
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
      getAllLanguageAreas,
      getTranslationById,
      clearGetTranslationById,
      editTranslation,
      deleteTranslation,
      searchTranslationsByArea,
      clearSearchTranslationsByArea,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByArea)
);
