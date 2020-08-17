import React from "react";
import Bowser from "bowser";

import CreateEtymologyMapResultsContainer from "./CreateEtymologyMapResultsContainer.js";
// import AreaSearchSelect from "../components/AreaSearchSelect.js";
// import WordSearchSelect from "../selects/WordSearchSelect.js";
import WordNameAutofill from "../selects/WordNameAutofill.js";
import MiniTable from "../components/MiniTable.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames, getWordDefinition } from "../actions/wordActions.js";
import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  //   searchTranslationsByArea,
  searchTranslationsByAreaEuropeMap,
  searchTranslationsByEtymologyImg,
  isLoading,
  clearSearchTranslationsByEtymologyImg,
  clearSearchTranslationsByArea,
  getTranslationById,
  deleteTranslation,
} from "../actions/translationActions.js";

class CreateEtymologyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: "Europe",
      selectedWord: "",
      searchedArea: "",
      searchedWord: "",
      isSafari: false,
    };
  }

  componentDidMount() {
    // if (this.props.wordNames.length === 0) {
    //   this.props.getWordNames();
    // }
    // if (this.props.languageAreaNames.length === 0) {
    //   this.props.getAllLanguageAreaNames();
    // }
    this.props.getWordNames();
    this.props.clearSearchTranslationsByEtymologyImg();
    this.props.clearSearchTranslationsByArea();
    this.isSafari();
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnSubmit = (e, userInput) => {
    e.preventDefault();
    Promise.all([
      this.props.clearSearchTranslationsByEtymologyImg(),
      this.props.clearSearchTranslationsByArea(),
      this.props.isLoading(),
      //   this.props.getWordDefinition(this.state.selectedWord),
      this.props.getWordDefinition(userInput),
      //   this.props.searchTranslationsByArea(
      //     this.state.selectedArea,
      //     this.state.selectedWord
      //   ),
      //   newer map only method below
      //   this.props.searchTranslationsByAreaEuropeMap(
      //     this.state.selectedArea,
      //     this.state.selectedWord
      //   ),
      this.props.searchTranslationsByAreaEuropeMap(
        this.state.selectedArea,
        userInput
      ),

      //   this.props.searchTranslationsByEtymologyImg(
      //     this.state.selectedArea,
      //     this.state.selectedWord
      //   ),
      this.props.searchTranslationsByEtymologyImg(
        this.state.selectedArea,
        userInput
      ),
      this.setState({
        selectedArea: "Europe",
        selectedWord: "",
        searchedArea: this.state.selectedArea,
        // searchedWord: this.state.selectedWord,
        searchedWord: userInput,
      }),
    ]);
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    this.props.getTranslationById(translationId);
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  isSafari = () => {
    // const isSafari = navigator.userAgent.indexOf("Safari") > -1;
    // this.setState({ isSafari: isSafari }, () =>
    //   console.log(this.state.isSafari)
    // );
    const browser = Bowser.getParser(window.navigator.userAgent);
    console.log(browser.getBrowser()["name"]);
    if (browser.getBrowser()["name"] === "Safari") {
      this.setState({ isSafari: true }, () => console.log(this.state.isSafari));
    }
  };

  render() {
    //   const allAreas =
    //     this.props.languageAreaNames && this.props.languageAreaNames.length > 0
    //       ? this.props.languageAreaNames.map((area, index) => {
    //           return area ? <option key={index}>{area}</option> : null;
    //         })
    //       : null;
    // const allWords =
    //   this.props.wordNames && this.props.wordNames.length > 0
    //     ? this.props.wordNames.map((word) => {
    //         return <option key={word.id}>{word.word_name}</option>;
    //       })
    //     : null;
    const wordNames =
      this.props.wordNames && this.props.wordNames.length
        ? this.props.wordNames.map((word) => {
            return word.word_name;
          })
        : null;
    let shouldRender;
    if (
      this.props.wordDefinition.length > 0 &&
      this.props.translationMapByEtymology &&
      this.props.searchedTranslationsByArea.length
    ) {
      shouldRender = true;
    }
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <h3>Create a Comparitive Etymology Map</h3>
          {/* <AreaSearchSelect
            allAreas="Europe"
            selectedArea={this.state.selectedArea}
            handleOnChange={this.handleOnChange}
          /> */}
          <div className="form-row">
            <div className="form-group half-col">
              <select
                id="select"
                name="selectedArea"
                value={this.state.selectedArea}
                onChange={this.handleOnChange}
              >
                <option value="">Select Area</option>
                {/* {allAreas} */}
                <option value="Europe">Europe</option>
              </select>
            </div>

            {/* <WordSearchSelect
            allWords={allWords}
            selectedWord={this.state.selectedWord}
            handleOnChange={this.handleOnChange}
          /> */}
            {/* <input
              type="submit"
              value="Search"
              className={
                this.state.selectedArea && this.state.selectedWord
                  ? "submit-btn"
                  : "disabled-btn"
              }
              disabled={!this.state.selectedArea || !this.state.selectedWord}
            /> */}
            <div className="form-group half-col">
              <WordNameAutofill
                wordNames={wordNames}
                selectedWord={this.state.selectedWord}
                // handleOnChange={this.handleOnChange}
                handleOnSubmit={this.handleOnSubmit}
              />
            </div>
          </div>
        </form>
        {shouldRender ? (
          <div>
            <MiniTable
              searchedArea={this.state.searchedArea}
              searchedWord={this.state.searchedWord}
              wordDefinition={this.props.wordDefinition}
              count={this.props.searchedTranslationsByArea.length}
            />

            {this.state.isSafari ? (
              <>
                {/* <div> */}
                <a
                  href={this.props.translationMapByEtymology}
                  xlinkHref={this.props.translationMapByEtymology}
                  target="_self"
                  //   target="_rel"
                  rel="noopener noreferrer"
                >
                  <img
                    src={this.props.translationMapByEtymology}
                    type="image/svg+xml"
                    className="map"
                    alt="Europe map"
                    aria-label="Europe map"
                    xlinkHref={this.props.translationMapByEtymology}
                  ></img>
                  {/* Link */}
                  {/* <object
                      xlinkHref={this.props.translationMapByEtymology}
                      data={this.props.translationMapByEtymology}
                      type="image/svg+xml"
                      className="map"
                      alt="Europe map"
                      aria-label="Europe map"
                    ></object> */}
                </a>
                {/* <img
                    type="image/svg+xml"
                    className="map"
                    alt="Europe map"
                    aria-label="Europe map"
                    xlinkHref={this.props.translationMapByEtymology}
                  ></img> */}
                {/* below gives clickable link, but blank 300x150 image */}
                {/* <svg
                    className="map"
                    xlinkHref={this.props.translationMapByEtymology}
                  ></svg> */}
              </>
            ) : (
              <a
                href={this.props.translationMapByEtymology}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  type="image/svg+xml"
                  src={this.props.translationMapByEtymology}
                  className="map"
                  alt="Europe map"
                  mimetype="image/svg+xml"
                />
              </a>
            )}

            <CreateEtymologyMapResultsContainer
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
  translationMapByEtymology: state.translations.translationMapByEtymology,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      getAllLanguageAreaNames,
      getWordDefinition,
      //   searchTranslationsByArea,
      searchTranslationsByAreaEuropeMap,
      searchTranslationsByEtymologyImg,
      isLoading,
      clearSearchTranslationsByEtymologyImg,
      clearSearchTranslationsByArea,
      getTranslationById,
      deleteTranslation,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEtymologyMap)
);
