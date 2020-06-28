import React from "react";
import SearchTranslationsByLanguageResultsContainer from "./SearchTranslationsByLanguageResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  searchTranslationsByLanguage,
  getTranslationById,
  deleteTranslation,
} from "../actions/translationActions.js";

class SearchTranslationsByLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "",
      searchedLanguage: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.searchTranslationsByLanguage(this.state.selectedLanguage);
    this.setState({
      searchedLanguage: this.state.selectedLanguage,
      selectedLanguage: "",
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
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input
            type="text"
            id="search"
            name="selectedLanguage"
            placeholder="Input Language: "
            className="input"
            onChange={(e) => this.handleOnChange(e)}
            value={this.state.selectedLanguage}
          />
          <input
            type="submit"
            value="Search"
            disabled={!this.state.selectedLanguage}
            className={this.state.selectedLanguage ? "submit-btn" : "disabled"}
          />
        </form>
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
  searchedTranslationsByLanguage:
    state.translations.searchedTranslationsByLanguage,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      searchTranslationsByLanguage,
      getTranslationById,
      deleteTranslation,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByLanguage)
);
