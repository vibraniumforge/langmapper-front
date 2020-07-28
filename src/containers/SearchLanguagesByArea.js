import React from "react";
import SearchLanguagesByAreaResultsContainer from "./SearchLanguagesByAreaResultsContainer.js";
import AreaSearchSelect from "../selects/AreaSearchSelect.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getAllLanguageAreaNames,
  searchLanguagesByArea,
  clearSeachLanguagesByArea,
  getLanguageById,
  deleteLanguage,
} from "../actions/languageActions.js";

import { clearGetWordDefinition } from "../actions/wordActions.js";

class SearchLanguagesByArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: "",
      searchedArea: "",
    };
  }

  componentDidMount() {
    if (
      this.props.languageAreaNames &&
      this.props.languageAreaNames.length === 0
    ) {
      this.props.getAllLanguageAreaNames();
    }
    if (this.props.languagesByArea.length) {
      this.props.clearGetLanguagesByArea();
    }
    this.props.clearGetWordDefinition();
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onHandleEdit = (e, languageId) => {
    e.preventDefault();
    this.props.getLanguageById(languageId);
    this.props.history.push(`/edit_language/${languageId}`);
  };

  onHandleDelete = (e, languageId) => {
    e.preventDefault();
    this.props.deleteLanguage(languageId);
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.getLanguagesByArea(this.state.selectedArea);
    this.setState({
      selectedArea: "",
      searchedArea: this.state.selectedArea,
    });
  };

  render() {
    const allAreas =
      this.props.languageAreaNames && this.props.languageAreaNames.length > 0
        ? this.props.languageAreaNames.map((area, index) => {
            return area ? <option key={index}>{area}</option> : null;
          })
        : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <h3>Search all Languages in an Area</h3>
          <AreaSearchSelect
            allAreas={allAreas}
            selectedArea={this.state.selectedArea}
            handleOnChange={this.handleOnChange}
          />
          <input
            disabled={!this.state.selectedArea}
            type="submit"
            value="Search"
            className={this.state.selectedArea ? "submit-btn" : "disabled-btn"}
          />
        </form>
        <SearchLanguagesByAreaResultsContainer
          languagesByArea={this.props.languagesByArea}
          searchedArea={this.state.searchedArea}
          onHandleDelete={this.onHandleDelete}
          onHandleEdit={this.onHandleEdit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  languageAreaNames: state.languages.languageAreaNames,
  languagesByArea: state.languages.languagesByArea,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllLanguageAreaNames,
      searchLanguagesByArea,
      clearSeachLanguagesByArea,
      getLanguageById,
      deleteLanguage,
      clearGetWordDefinition,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchLanguagesByArea)
);
