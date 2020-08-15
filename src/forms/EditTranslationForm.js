import React, { Component } from "react";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  editTranslation,
  searchTranslationsByArea,
  isLoading,
} from "../actions/translationActions.js";

class TranslationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      language_id: "",
      word_id: "",
      language: "",
      word: "",
      etymology: "",
      gender: "",
      link: "",
      romanization: "",
      translation: "",
      isChanged: false,
      isMongo_id: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.translationToUpdate !== nextProps.translationToUpdate) {
      this.setState(
        {
          id: nextProps.translationToUpdate.id,
          language_id: nextProps.translationToUpdate.language.id,
          word_id: nextProps.translationToUpdate.word.id,
          language: nextProps.translationToUpdate.language.name,
          word: nextProps.translationToUpdate.word.word_name,
          etymology: nextProps.translationToUpdate.etymology,
          gender: nextProps.translationToUpdate.gender,
          link: nextProps.translationToUpdate.link,
          romanization: nextProps.translationToUpdate.romanization,
          translation: nextProps.translationToUpdate.translation,
          isMongo_id:
            nextProps.translationToUpdate.id.length > 5 ? true : false,
        },
        () => console.log(this.state)
      );
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (!this.state.isChanged) {
      this.setState({ isChanged: true });
    }
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const translationId = this.props.location.pathname.split("/").pop();
    const editedTranslation = {
      etymology: this.state.etymology,
      gender: this.state.gender === "null" ? null : this.state.gender,
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
    // this.props.history.push("/search_translations_by_area");
    this.props.history.goBack();
  };

  cancelFormAction = () => {
    this.props.history.goBack();
  };

  clearForm = () => {
    this.setState({
      id: "",
      language_id: "",
      word_id: "",
      language: "",
      word: "",
      etymology: "",
      gender: "",
      link: "",
      romanization: "",
      translation: "",
      isChanged: false,
      isMongo_id: false,
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
            <h1>Edit a Translation</h1>
            {this.state.isMongo_id ? (
              <>
                <div className="form-row">
                  <div className="form-group full-col">
                    <h3>ID: {this.state.id}</h3>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group half-col">
                    <h3>Word ID: {this.state.language_id}</h3>
                  </div>
                  <div className="form-group half-col">
                    <h3>Language ID: {this.state.word_id}</h3>
                  </div>{" "}
                </div>
              </>
            ) : (
              <div className="form-row">
                <div className="form-group one-third-col">
                  <h3>ID: {this.state.id}</h3>
                </div>
                <div className="form-group one-third-col">
                  <h3>Word ID: {this.state.language_id}</h3>
                </div>
                <div className="form-group one-third-col">
                  <h3>Language ID: {this.state.word_id}</h3>
                </div>
              </div>
            )}
            <div className="form-row">
              <div className="form-group quarter-col">
                {/* <label htmlFor="word">Word: </label>
                <input
                  type="text"
                  id="word"
                  name="word"
                  className="form-control"
                  placeholder="Word"
                  value={this.state.word || ""}
                  onChange={this.handleOnChange}
                  disabled
                /> */}
                <h3>Word: {this.state.word}</h3>
              </div>
              <div className="form-group quarter-col">
                {/* <label htmlFor="language">Language: </label>
                <input
                  id="language"
                  type="text"
                  className="form-control"
                  name="language"
                  placeholder="Language Name"
                  value={this.state.language || ""}
                  onChange={this.handleOnChange}
                  disabled
                /> */}
                <h3>Language: {this.state.language}</h3>
              </div>
              <div className="form-group half-col">
                <h3>Link: {this.state.link}</h3>
              </div>
            </div>
            {/* <div className="form-row">
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
            </div> */}
            <div className="form-row">
              <div className="form-group one-third-col">
                <label htmlFor="gender">Gender: </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="form-control"
                  placeholder="Gender"
                  value={this.state.gender || ""}
                  onChange={this.handleOnChange}
                  //   disabled
                />
              </div>
              <div className="form-group one-third-col">
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
              <div className="form-group one-third-col">
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
    ) : (
      <Spinner isLoading={this.props.isLoading} />
    );
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
    { editTranslation, searchTranslationsByArea, isLoading },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TranslationForm)
);
