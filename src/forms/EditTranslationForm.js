import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  editTranslation,
  searchTranslationsByArea,
} from "../actions/translationActions.js";

class TranslationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      word: "",
      etymology: "",
      gender: "",
      link: "",
      romanization: "",
      translation: "",
      isChanged: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.translationToUpdate !== nextProps.translationToUpdate) {
      this.setState({
        language: nextProps.translationToUpdate.language.name,
        word: nextProps.translationToUpdate.word.word_name,
        etymology: nextProps.translationToUpdate.etymology,
        gender: nextProps.translationToUpdate.gender,
        link: nextProps.translationToUpdate.link,
        romanization: nextProps.translationToUpdate.romanization,
        translation: nextProps.translationToUpdate.translation,
      });
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, isChanged: true });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const translationId = this.props.location.pathname.split("/").pop();
    const editedTranslation = {
      etymology: this.state.etymology,
      gender: this.state.gender,
      link: this.state.link,
      romanization: this.state.romanization,
      translation: this.state.translation,
    };
    this.props.editTranslation(translationId, editedTranslation);
    this.clearForm();
    // this.props.searchTranslationsByArea(
    //   this.props.searchArea,
    //   this.props.searchWord
    // );
    this.props.history.push("/search_translations_by_area");
  };

  cancelFormAction = () => {
    this.props.history.goBack();
  };

  clearForm = () => {
    this.setState({
      etymology: "",
      gender: "",
      link: "",
      romanization: "",
      translation: "",
    });
  };

  render() {
    return this.props.translationToUpdate ? (
      <>
        <div className="">
          <form
            id="edit-translation-form"
            onSubmit={(e) => this.handleOnSubmit(e)}
          >
            <h2>Edit a Translation</h2>
            <div className="form-row">
              <div className="form-group half-col">
                <label htmlFor="language">Language: </label>
                <input
                  id="language"
                  type="text"
                  className="form-control"
                  name="language"
                  placeholder="Language Name"
                  value={this.state.language || ""}
                  onChange={this.handleOnChange}
                  disabled
                />
              </div>
              <div className="form-group half-col">
                <label htmlFor="word">Word: </label>
                <input
                  type="text"
                  id="word"
                  name="word"
                  className="form-control"
                  placeholder="Word"
                  value={this.state.word || ""}
                  onChange={this.handleOnChange}
                  disabled
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group quarter-col">
                <label htmlFor="gender">Gender: </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="form-control"
                  placeholder="Gender"
                  value={this.state.gender || ""}
                  onChange={this.handleOnChange}
                  disabled
                />
              </div>
              <div className="form-group three-quarter-col">
                <label htmlFor="link">Link: </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  className="form-control"
                  placeholder="Link"
                  value={this.state.link || ""}
                  onChange={this.handleOnChange}
                  disabled
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group half-col">
                <label htmlFor="translation">Translation: </label>
                <input
                  type="text"
                  id="translation"
                  name="translation"
                  className="form-control"
                  placeholder="Translation"
                  value={this.state.translation || ""}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group half-col">
                <label htmlFor="romanization">Romanization: </label>
                <input
                  type="text"
                  id="romanization"
                  name="romanization"
                  className="form-control"
                  placeholder="Romanization"
                  value={this.state.romanization || ""}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="full-col">
                <label htmlFor="etymology">Etymology: </label>
                <textarea
                  id="etymology"
                  name="etymology"
                  placeholder="Etymology"
                  value={this.state.etymology || ""}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
            <div>
              <input
                type="submit"
                value="Update"
                className={this.state.isChanged ? "submit-btn" : "disabled-btn"}
                disabled={!this.state.isChanged}
              />
              <button
                type="button"
                className="clear-btn"
                onClick={this.clearForm}
              >
                Clear Form
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={this.cancelFormAction}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    translationToUpdate: state.translations.translationToUpdate,
    searchArea: state.translations.searchArea,
    searchWord: state.translations.searchWord,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { editTranslation, searchTranslationsByArea },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TranslationForm)
);