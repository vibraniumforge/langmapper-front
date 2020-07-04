import React from "react";
import CreateGenderMapResultsContainer from "./CreateGenderMapResultsContainer.js";
import AreaSearchSelect from "../components/AreaSearchSelect.js";
import WordSearchSelect from "../components/WordSearchSelect.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames, getWordDefinition } from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  searchTranslationsByArea,
  searchTranslationsByGenderImg,
  isLoading,
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
    this.props.getAllLanguageAreaNames();
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    Promise.all([
      this.props.isLoading(),
      this.props.getWordDefinition(this.state.selectedWord),
      this.props.searchTranslationsByArea(
        this.state.selectedArea,
        this.state.selectedWord
      ),
      this.props.searchTranslationsByGenderImg(
        this.state.selectedArea,
        this.state.selectedWord
      ),
      this.setState({
        searchedAre: this.state.selectedArea,
        searchedWord: this.state.selectedWord,
        selectedArea: "Europe",
        selectedWord: "",
      }),
    ]);
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  render() {
    // const allAreas =
    //   this.props.languageAreaNames && this.props.languageAreaNames.length > 0
    //     ? this.props.languageAreaNames.map((area, index) => {
    //         return area ? <option key={index}>{area}</option> : null;
    //       })
    //     : null;
    const allWords =
      this.props.wordNames && this.props.wordNames.length > 0
        ? this.props.wordNames.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;

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
          {/* <AreaSearchSelect
            allAreas={allAreas}
            selectedArea={this.state.selectedArea}
            handleOnChange={this.handleOnChange}
          /> */}
          <select
            id="select"
            name="selectedArea"
            value={this.state.selectedArea}
            onChange={this.handleOnChange}
          >
            <option value="">Select Area</option>
            <option value="Europe">Europe</option>
          </select>

          <WordSearchSelect
            allWords={allWords}
            selectedWord={this.state.selectedWord}
            handleOnChange={this.handleOnChange}
          />
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
        ) : this.state.searchedWord ? (
          <Spinner isLoading={this.props.isLoading} />
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
      isLoading,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateGenderMap)
);
