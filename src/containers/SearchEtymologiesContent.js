import React from "react";
import SearchEtymologiesContentResultsContainer from "./SearchEtymologiesContentResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  searchTranslationsByEtymology,
  isLoading,
  clearSearchTranslationsByEtymology,
  getTranslationById,
} from "../actions/translationActions.js";

class SearchEtymologiesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      searchedWord: "",
    };
  }

  componentDidMount() {
    if (this.props.searchedTranslationsByEtymology.length) {
      this.props.clearSearchTranslationsByEtymology();
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    this.props.isLoading();
    this.props.searchTranslationsByEtymology(this.state.selectedWord);
    this.setState({
      searchedWord: this.state.selectedWord,
      selectedWord: "",
    });
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <h3>Search the etymologies of every word</h3>
          <input
            id="search-by-ety"
            type="text"
            name="selectedWord"
            placeholder="Search here"
            className="input"
            onChange={(e) => this.handleOnChange(e)}
            value={this.state.selectedWord}
          />
          <input
            disabled={!this.state.selectedWord}
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled-btn"}
          />
        </form>
        {this.state.searchedWord &&
        this.props.searchedTranslationsByEtymology ? (
          <SearchEtymologiesContentResultsContainer
            searchedTranslationsByEtymology={
              this.props.searchedTranslationsByEtymology
            }
            isLoadingNow={this.props.isLoadingNow}
            searchedWord={this.state.searchedWord}
            onHandleDelete={this.onHandleDelete}
            onHandleEdit={this.onHandleEdit}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchedTranslationsByEtymology:
    state.translations.searchedTranslationsByEtymology,
  isLoadingNow: state.translations.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      searchTranslationsByEtymology,
      isLoading,
      clearSearchTranslationsByEtymology,
      getTranslationById,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchEtymologiesContent)
);
