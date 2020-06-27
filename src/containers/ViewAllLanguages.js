import React, { Component } from "react";
import ViewAllLanguagesResultsContainer from "./ViewAllLanguagesResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getLanguages,
  getLanguageById,
  editLanguage,
  deleteLanguage,
} from "../actions/languageActions.js";

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
        <ViewAllLanguagesResultsContainer
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
          languages={this.props.languages}
        />
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
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllLanguages)
);
