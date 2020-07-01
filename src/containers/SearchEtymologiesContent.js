import React from "react";
import SearchEtymologiesContentResultsContainer from "./SearchEtymologiesContentResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { searchTranslationsByEtymology } from "../actions/translationActions.js";

class SearchEtymologiesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      selectedWord: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.searchTranslationsByEtymology(this.state.searchWord);
    this.setState({
      selectedWord: this.state.searchWord,
      searchWord: "",
    });
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input
            type="text"
            id="search"
            name="searchWord"
            placeholder="Search here"
            className="input"
            onChange={(e) => this.handleOnChange(e)}
            value={this.state.searchWord}
          />
          <input
            disabled={!this.state.searchWord}
            type="submit"
            value="Search"
            className={this.state.searchWord ? "submit-btn" : "disabled"}
          />
        </form>
        <SearchEtymologiesContentResultsContainer
          searchedTranslationsByEtymology={
            this.props.searchedTranslationsByEtymology
          }
          selectedWord={this.state.selectedWord}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchedTranslationsByEtymology:
    state.translations.searchedTranslationsByEtymology,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      searchTranslationsByEtymology,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchEtymologiesContent)
);
