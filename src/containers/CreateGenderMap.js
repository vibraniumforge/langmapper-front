import React from "react";
import CreateGenderMapResultsContainer from "./CreateGenderMapResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames, getWordDefinition } from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  searchTranslationsByArea,
  searchTranslationsByGenderImg,
} from "../actions/translationActions.js";

class CreateGenderMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: "Europe",
      selectedWord: "",
      searchedArea: "",
      searchedWord: "",
    };
  }

  componentDidMount() {
    this.props.getWordNames();
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.getWordDefinition(this.state.selectedWord);
    this.props.searchTranslationsByArea(
      this.state.selectedArea,
      this.state.selectedWord
    );

    this.props.searchTranslationsByGenderImg(
      this.state.selectedArea,
      this.state.selectedWord
    );

    this.setState({
      searchedAre: this.state.selectedArea,
      searchedWord: this.state.selectedWord,
      selectedArea: "Europe",
      selectedWord: "",
    });
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  render() {
    const allWords =
      this.props.wordNames && this.props.wordNames.length > 0
        ? this.props.wordNames.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    // const allAreas =
    //   this.props.languageAreaNames && this.props.languageAreaNames.length > 0
    //     ? this.props.languageAreaNames.map((area, index) => {
    //         return area ? <option key={index}>{area}</option> : null;
    //       })
    //     : null;

    let render;
    if (
      this.props.wordDefinition.length &&
      this.props.translationMapByGender &&
      this.props.searchedTranslationsByArea.length
    ) {
      render = true;
    }
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedArea"
            value={this.state.selectedArea}
            onChange={this.handleOnChange}
          >
            <option value="">Select Area</option>
            {/* {allAreass} */}
            <option value="Europe">Europe</option>
          </select>
          <select
            id="select"
            name="selectedWord"
            value={this.state.selectedWord}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Word</option>
            {allWords}
          </select>
          <input
            type="submit"
            value="Search"
            className={
              this.state.selectedArea && this.state.selectedWord
                ? "submit-btn"
                : "disabled"
            }
            disabled={!this.state.selectedArea || !this.state.selectedWord}
          />
        </form>
        {render ? (
          <div>
            {/* <h3>Area: {this.state.searchedArea}</h3> */}

            <h3>Word: {this.state.searchedWord}</h3>
            <h3>Definition: {this.props.wordDefinition}</h3>

            <img
              src={this.props.translationMapByGender}
              alt="europe language map"
              className="map"
            />

            <CreateGenderMapResultsContainer
              searchedTranslationsByArea={this.props.searchedTranslationsByArea}
              onHandleEdit={this.onHandleEdit}
            />
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  wordNames: state.words.wordNames,
  languageAreaNames: state.languages.languageAreaNames,
  wordDefinition: state.words.wordDefinition,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
  translationMapByGender: state.translations.translationMapByGender,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      getAllLanguageAreaNames,
      getWordDefinition,
      searchTranslationsByArea,
      searchTranslationsByGenderImg,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateGenderMap)
);
