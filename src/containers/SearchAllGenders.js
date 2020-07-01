import React from "react";
import SearchAllGendersResultsContainer from "./SearchAllGendersResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";

import {
  searchTranslationsByWordGender,
  getTranslationById,
  deleteTranslation,
} from "../actions/translationActions.js";

class SearchAllGenders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      searchedWord: "",
    };
  }

  componentDidMount() {
    if (this.props.words.length === 0) {
      this.props.getWords();
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.searchTranslationsByWordGender(this.state.selectedWord);
    this.setState({
      searchedWord: this.state.selectedWord,
      selectedWord: "",
    });
  };

  render() {
    const words =
      this.props.words.length > 0
        ? this.props.words.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedWord"
            value={this.state.selectedWord}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Word</option>
            {words}
          </select>
          <input
            disabled={!this.state.selectedWord}
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled"}
          />
        </form>
        <SearchAllGendersResultsContainer
          searchedTranslationsByWordGender={
            this.props.searchedTranslationsByWordGender
          }
          searchedWord={this.state.searchedWord}
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  words: state.words.words,
  searchedTranslationsByWordGender:
    state.translations.searchedTranslationsByWordGender,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      searchTranslationsByWordGender,
      getTranslationById,
      deleteTranslation,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchAllGenders)
);
