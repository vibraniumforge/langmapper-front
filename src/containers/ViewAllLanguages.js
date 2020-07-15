import React, { Component } from "react";
import ViewAllLanguagesResultsContainer from "./ViewAllLanguagesResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { isLoading } from "../actions/translationActions.js";

import {
  getLanguages,
  getLanguageById,
  editLanguage,
  deleteLanguage,
} from "../actions/languageActions.js";

import Spinner from "../components/Spinner.js";

class ViewAllLanguages extends Component {
  componentDidMount() {
    this.props.getLanguages();
  }

  onHandleEdit = (e, languageId) => {
    e.preventDefault();
    this.props.getLanguageById(languageId);
    this.props.history.push(`/edit_language/${languageId}`);
  };

  onHandleDelete = (e, languageId) => {
    e.preventDefault();
    this.props.deleteLanguage(languageId);
  };

  render() {
    return (
      <>
        {this.props.languages.length > 0 ? (
          <ViewAllLanguagesResultsContainer
            onHandleDelete={this.onHandleDelete}
            onHandleEdit={this.onHandleEdit}
            languages={this.props.languages}
          />
        ) : (
          <Spinner isLoading={this.props.isLoading} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  languages: state.languages.languages,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLanguages,
      getLanguageById,
      editLanguage,
      deleteLanguage,
      isLoading,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllLanguages)
);
