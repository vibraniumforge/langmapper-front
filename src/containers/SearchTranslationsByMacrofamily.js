import React from "react";
import SearchTranslationsByMacrofamilyResultsContainer from "./SearchTranslationsByMacrofamilyResultsContainer.js";

import AreaSearchSelect from "../components/AreaSearchSelect.js";
import WordSearchSelect from "../components/WordSearchSelect.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";

import { getAllMacrofamilyNames } from "../actions/languageActions.js";

import {
  getTranslationById,
  deleteTranslation,
  searchTranslationsByArea,
  clearGetTranslationsByArea,
  getSearchArea,
  clearGetSearchArea,
  getSearchWord,
  clearGetSearchWord,
  isLoading,
  searchTranslationsByMacrofamily,
  clearSearchTranslationsByMacrofamily,
} from "../actions/translationActions.js";

class SearchTranslationsByMacrofamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFamily: "",
      searchedFamily: "",
    };
  }

  componentDidMount() {
    this.props.clearSearchTranslationsByMacrofamily();
    if (
      this.props.macrofamilyNames &&
      this.props.macrofamilyNames.length === 0
    ) {
      this.props.getAllMacrofamilyNames();
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.searchTranslationsByMacrofamily(this.state.selectedFamily);
    this.setState({
      searchedFamily: this.state.selectedFamily,
      selectedFamily: "",
    });
  };

  render() {
    const macrofamilies =
      this.props.macrofamilyNames && this.props.macrofamilyNames.length > 0
        ? this.props.macrofamilyNames.map((macrofamily, index) => {
            return macrofamily ? (
              <option key={index}>{macrofamily}</option>
            ) : null;
          })
        : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedFamily"
            value={this.state.selectedFamily}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Macrofamily</option>
            {macrofamilies}
          </select>
          <input
            disabled={!this.state.selectedFamily}
            type="submit"
            value="Search"
            className={this.state.selectedFamily ? "submit-btn" : "disabled"}
          />
        </form>
        <SearchTranslationsByMacrofamilyResultsContainer
          searchedTranslationsByMacrofamily={
            this.props.searchedTranslationsByMacrofamily
          }
          searchedFamily={this.state.searchedFamily}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  words: state.words.words,
  macrofamilyNames: state.languages.macrofamilyNames,
  searchedTranslationsByMacrofamily:
    state.translations.searchedTranslationsByMacrofamily,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
  isLoadingNow: state.translations.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWords,
      getTranslationById,
      deleteTranslation,
      searchTranslationsByArea,
      clearGetTranslationsByArea,
      getSearchArea,
      clearGetSearchArea,
      getSearchWord,
      clearGetSearchWord,
      getAllMacrofamilyNames,
      isLoading,
      searchTranslationsByMacrofamily,
      clearSearchTranslationsByMacrofamily,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchTranslationsByMacrofamily)
);
