import React from "react";
import SearchTranslationsByLanguageResultsContainer from "./SearchTranslationsByLanguageResultsContainer.js";
import LanguageNameAutofill from "../components/LanguageNameAutofill.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getLanguages } from "../actions/languageActions.js";

import {
  searchTranslationsByLanguage,
  clearSearchedTranslationsByLanguage,
  getTranslationById,
  deleteTranslation,
} from "../actions/translationActions.js";

class SearchTranslationsByLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedLanguage: "",
    };
  }

  componentDidMount() {
    if (this.props.searchedTranslationsByLanguage.length) {
      this.props.clearSearchedTranslationsByLanguage();
    }
    this.props.getLanguages();
  }

  handleOnSubmit = (e, languageName) => {
    e.preventDefault();

    this.props.searchTranslationsByLanguage(languageName);
    this.setState({
      //   searchedLanguage: this.state.selectedLanguage,
      searchedLanguage:
        languageName.charAt(0).toUpperCase() + languageName.slice(1),
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
    const langNames =
      this.props.languages && this.props.languages.length > 0
        ? this.props.languages.map((language) => {
            return language.name;
          })
        : null;
    return (
      <>
        <LanguageNameAutofill
          langNames={langNames}
          handleOnSubmit={this.handleOnSubmit}
        />
        {/* <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input
            type="text"
            id="search"
            name="selectedLanguage"
            placeholder="Input Language: "
            className="input"
            onChange={(e) => this.handleOnChange(e)}
            value={this.state.selectedLanguage}
          />
        </form> */}
        <SearchTranslationsByLanguageResultsContainer
          searchedTranslationsByLanguage={
            this.props.searchedTranslationsByLanguage
          }
          searchedLanguage={this.state.searchedLanguage}
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  languages: state.languages.languages,
  searchedTranslationsByLanguage:
    state.translations.searchedTranslationsByLanguage,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLanguages,
      searchTranslationsByLanguage,
      clearSearchedTranslationsByLanguage,
      getTranslationById,
      deleteTranslation,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByLanguage)
);
