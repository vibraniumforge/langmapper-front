import React from "react";
import SearchTranslationsByLanguageResultsContainer from "./SearchTranslationsByLanguageResultsContainer.js";
import LanguageNameAutofill from "../selects/LanguageNameAutofill.js";
import MiniTable from "../components/MiniTable.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getLanguages,
  getSearchLanguage,
  clearGetSearchLanguage,
} from "../actions/languageActions.js";

import {
  searchTranslationsByLanguage,
  clearSearchTranslationsByLanguage,
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
      this.props.clearSearchTranslationsByLanguage();
    }
    this.props.getLanguages();
  }

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    this.props.getTranslationById(translationId);
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  onHandleDelete = (e, translationId) => {
    e.preventDefault();
    this.props.deleteTranslation(translationId);
  };

  handleOnSubmit = (e, languageName) => {
    e.preventDefault();
    this.props.getSearchLanguage(languageName);
    this.props.searchTranslationsByLanguage(languageName);
    this.setState({
      //   searchedLanguage: this.state.selectedLanguage,
      searchedLanguage:
        languageName.charAt(0).toUpperCase() + languageName.slice(1),
    });
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
        <form>
          <h3>Search all the Translations of a Language</h3>
          <LanguageNameAutofill
            langNames={langNames}
            handleOnSubmit={this.handleOnSubmit}
          />
        </form>
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

        {this.props.searchedTranslationsByLanguage.length > 0 ? (
          <>
            {" "}
            <MiniTable
              searchedLanguage={
                this.state.searchedLanguage || this.props.searchedLanguage
              }
              count={this.props.searchedTranslationsByLanguage.length}
            />
            <SearchTranslationsByLanguageResultsContainer
              searchedTranslationsByLanguage={
                this.props.searchedTranslationsByLanguage
              }
              //   searchedLanguage={this.state.searchedLanguage}
              onHandleDelete={this.onHandleDelete}
              onHandleEdit={this.onHandleEdit}
            />
          </>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  languages: state.languages.languages,
  searchedTranslationsByLanguage:
    state.translations.searchedTranslationsByLanguage,
  searchedLanguage: state.languages.searchedLanguage,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLanguages,
      searchTranslationsByLanguage,
      clearSearchTranslationsByLanguage,
      getTranslationById,
      deleteTranslation,
      getSearchLanguage,
      clearGetSearchLanguage,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByLanguage)
);
