import React from "react";
import CreateGenderMapResultsContainer from "./CreateGenderMapResultsContainer.js";
// import AreaSearchSelect from "../components/AreaSearchSelect.js";
import WordSearchSelect from "../selects/WordSearchSelect.js";
import Spinner from "../components/Spinner.js";
import MiniTable from "../components/MiniTable.js";

import { isSafari } from "../helpers/browserHelper.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames, getWordDefinition } from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  //   searchTranslationsByArea,
  searchTranslationsByAreaEuropeMap,
  searchTranslationsByGenderImg,
  isLoading,
  isNotLoading,
  clearSearchTranslationsByGenderImg,
  clearSearchTranslationsByArea,
  getTranslationById,
  deleteTranslation,
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
    if (this.props.wordNames.length === 0) {
      this.props.getWordNames();
    }
    // if (this.props.languageAreaNames.length === 0) {
    //   this.props.getAllLanguageAreaNames();
    // }
    this.props.clearSearchTranslationsByGenderImg();
    this.props.clearSearchTranslationsByArea();
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
      this.props.clearSearchTranslationsByGenderImg(),
      this.props.clearSearchTranslationsByArea(),
      this.props.getWordDefinition(this.state.selectedWord),
      //   this.props.searchTranslationsByArea(
      //     this.state.selectedArea,
      //     this.state.selectedWord
      //   ),
      this.props.searchTranslationsByAreaEuropeMap(
        this.state.selectedArea,
        this.state.selectedWord
      ),
      this.props.searchTranslationsByGenderImg(
        this.state.selectedArea,
        this.state.selectedWord
      ),
      this.setState({
        searchedArea: this.state.selectedArea,
        searchedWord: this.state.selectedWord,
        selectedArea: "Europe",
        selectedWord: "",
      }),
      this.props.isNotLoading(),
    ]);
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    this.props.getTranslationById(translationId);
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  onHandleDelete = (e, translationId) => {
    e.preventDefault();
    this.props.deleteTranslation(translationId);
    this.props.history.goBack();
  };

  randomWord = (e) => {
    e.preventDefault();
    let randomWord;
    if (this.props.wordNames && this.props.wordNames.length > 0) {
      let randomNumber = Math.floor(
        Math.random() * this.props.wordNames.length
      );
      randomWord = this.props.wordNames[randomNumber].word_name;
    }
    // let randomArea;
    // if (
    //   this.props.languageAreaNames &&
    //   this.props.languageAreaNames.length > 0
    // ) {
    //   let randomNumber = Math.floor(
    //     Math.random() * this.props.languageAreaNames.length
    //   );
    //   randomArea = this.props.languageAreaNames[randomNumber].name;
    // }
    // this.setState({ selectedWord: randomWord, selectedArea: randomArea });
    this.setState({ selectedWord: randomWord });
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
          <h3>Create a Grammatical Gender Map by Area</h3>
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
                : "disabled-btn"
            }
            disabled={!this.state.selectedArea || !this.state.selectedWord}
          />
          <button
            type="button"
            onClick={(e) => this.randomWord(e)}
            className={this.state.selectedArea ? "submit-btn" : "disabled-btn"}
            disabled={!this.state.selectedArea}
          >
            Random Word
          </button>
        </form>
        {render ? (
          <div>
            <MiniTable
              searchedArea={this.state.searchedArea}
              searchedWord={this.state.searchedWord}
              wordDefinition={this.props.wordDefinition}
              count={this.props.searchedTranslationsByArea.length}
            />

            {isSafari() ? (
              <>
                <a
                  href={this.props.translationMapByGender}
                  xlinkHref={this.props.translationMapByGender}
                  target="_self"
                  //   target="_rel"
                  rel="noopener noreferrer"
                >
                  <img
                    src={this.props.translationMapByGender}
                    type="image/svg+xml"
                    className="map"
                    alt="Europe map"
                    aria-label="Europe map"
                    xlinkHref={this.props.translationMapByGender}
                  ></img>
                </a>
              </>
            ) : (
              <a
                href={this.props.translationMapByGender}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={this.props.translationMapByGender}
                  className="map"
                  alt="Europe map"
                  mimetype="image/svg+xml"
                />
              </a>
            )}

            <CreateGenderMapResultsContainer
              searchedTranslationsByArea={this.props.searchedTranslationsByArea}
              onHandleEdit={this.onHandleEdit}
              onHandleDelete={this.onHandleDelete}
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
      //   searchTranslationsByArea,
      searchTranslationsByAreaEuropeMap,
      searchTranslationsByGenderImg,
      isLoading,
      isNotLoading,
      clearSearchTranslationsByGenderImg,
      clearSearchTranslationsByArea,
      getTranslationById,
      deleteTranslation,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateGenderMap)
);
