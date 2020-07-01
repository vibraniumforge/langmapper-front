import React from "react";
import SearchLanguagesByAreaResultsContainer from "./SearchLanguagesByAreaResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getAllLanguageAreas,
  getLanguagesByArea,
  getLanguageById,
  deleteLanguage,
} from "../actions/languageActions.js";

class SearchLanguagesByArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: "",
      searchedArea: "",
    };
  }

  componentDidMount() {
    if (this.props.languageAreaNames.length === 0) {
      this.props.getAllLanguageAreas();
    }
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
    console.log(this.props);
    const languageAreaNames =
      this.props.languageAreaNames && this.props.languageAreaNames.length > 0
        ? this.props.languageAreaNames.map((area, index) => {
            return area ? <option key={index}>{area}</option> : null;
          })
        : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedArea"
            value={this.state.selectedArea}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Area</option>
            {languageAreaNames}
          </select>
          <input
            disabled={!this.state.selectedArea}
            type="submit"
            value="Search"
            className={this.state.selectedArea ? "submit-btn" : "disabled"}
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
      getAllLanguageAreas,
      getLanguagesByArea,
      getLanguageById,
      deleteLanguage,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchLanguagesByArea)
);
