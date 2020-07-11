import React from "react";
import SearchTranslationsByMacrofamilyResultsContainer from "./SearchTranslationsByMacrofamilyResultsContainer.js";
import MacrofamilySearchSelect from "../components/MacrofamilySearchSelect.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWords } from "../actions/wordActions.js";
import { getAllMacrofamilyNames } from "../actions/languageActions.js";
import {
  getTranslationById,
  deleteTranslation,
  isLoading,
  searchTranslationsByMacrofamily,
  clearSearchTranslationsByMacrofamily,
} from "../actions/translationActions.js";

class SearchTranslationsByMacrofamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMacrofamily: "",
      searchedMacrofamily: "",
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
    this.props.searchTranslationsByMacrofamily(this.state.selectedMacrofamily);
    this.setState({
      searchedMacrofamily: this.state.selectedMacrofamily,
      selectedMacrofamily: "",
    });
  };

  render() {
    const allMacrofamilies =
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
          {/* <select
            id="select"
            name="selectedFamily"
            value={this.state.selectedMacrofamily}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Macrofamily</option>
            {macrofamilies}
          </select> */}
          <MacrofamilySearchSelect
            allMacrofamilies={allMacrofamilies}
            selectedWord={this.state.selectedWord}
            handleOnChange={this.handleOnChange}
          />
          <input
            disabled={!this.state.selectedMacrofamily}
            type="submit"
            value="Search"
            className={
              this.state.selectedMacrofamily ? "submit-btn" : "disabled"
            }
          />
        </form>
        <SearchTranslationsByMacrofamilyResultsContainer
          searchedTranslationsByMacrofamily={
            this.props.searchedTranslationsByMacrofamily
          }
          searchedMacrofamily={this.state.searchedMacrofamily}
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
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
