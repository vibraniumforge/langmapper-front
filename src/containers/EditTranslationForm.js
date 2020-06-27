import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  editTranslation,
  clearGetTranslationById,
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
      alphabets: [],
      macrofamilies: [],
      editMode: null,
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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const splitLang = this.props.location.pathname.split("/");
    const translationId = splitLang[splitLang.length - 1];
    const editedTranslation = {
      language: this.state.language,
      word: this.state.word,
      etymology: this.state.etymology,
      gender: this.state.gender,
      link: this.state.link,
    };
    this.props.editTranslation(translationId, editedTranslation);
    this.clearForm();
    this.props.history.push("/all_translations_by_language");
  };

  cancelFormAction = () => {
    this.props.history.goBack();
  };

  clearForm = () => {
    this.setState({
      language: "",
      word: "",
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
        <form id="new-lang-form" onSubmit={(e) => this.handleOnSubmit(e)}>
          <h3>Edit a Translation</h3>
          <div>
            <label htmlFor="name">Language: </label>
            <input
              type="text"
              id="language"
              name="language"
              placeholder="Language Name"
              value={this.state.language || ""}
              onChange={this.handleOnChange}
              disabled
            />
            <label htmlFor="word">Word: </label>
            <input
              type="text"
              id="word"
              name="word"
              placeholder="Word"
              value={this.state.word || ""}
              onChange={this.handleOnChange}
              disabled
            />
          </div>
          <div>
            <label htmlFor="translation">Translation: </label>
            <input
              type="text"
              id="translation"
              name="translation"
              placeholder="Translation"
              value={this.state.translation || ""}
              onChange={this.handleOnChange}
            />
            <label htmlFor="romanization">Romanization: </label>
            <input
              type="text"
              id="romanization"
              name="romanization"
              placeholder="Romanization"
              value={this.state.romanization || ""}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="link">Link: </label>
            <input
              type="text"
              id="link"
              name="link"
              placeholder="Link"
              value={this.state.link || ""}
              onChange={this.handleOnChange}
            />

            <label htmlFor="gender">Gender: </label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="Gender"
              value={this.state.gender || "None Found"}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="etymology">Etymology: </label>
            <textarea
              id="etymology"
              name="etymology"
              placeholder="Etymology"
              value={this.state.etymology || "None Found"}
              onChange={this.handleOnChange}
            />
          </div>
          <input type="submit" value="Update" className="submit-btn" />
          <button type="button" className="clear-btn" onClick={this.clearForm}>
            Clear Form
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={this.cancelFormAction}
          >
            Cancel
          </button>
        </form>
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return { translationToUpdate: state.translations.translationToUpdate };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { editTranslation, clearGetTranslationById },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TranslationForm)
);
