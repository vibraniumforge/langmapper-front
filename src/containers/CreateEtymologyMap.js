import React from "react";
import CreateEtymologyMapResultsContainer from "./CreateEtymologyMapResultsContainer.js";
// import AreaSearchSelect from "../components/AreaSearchSelect.js";
import WordSearchSelect from "../selects/WordSearchSelect.js";
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

  handleOnSubmit = (e) => {
    e.preventDefault();
    Promise.all([
      this.props.clearSearchTranslationsByEtymologyImg(),
      this.props.clearSearchTranslationsByArea(),
      this.props.isLoading(),
      this.props.getWordDefinition(this.state.selectedWord),
      //   this.props.searchTranslationsByArea(
      //     this.state.selectedArea,
      //     this.state.selectedWord
      //   ),
      this.props.searchTranslationsByAreaEuropeMap(
        this.state.selectedArea,
        this.state.selectedWord
      ),

      this.props.searchTranslationsByEtymologyImg(
        this.state.selectedArea,
        this.state.selectedWord
      ),
      this.setState({
        searchedArea: this.state.selectedArea,
        searchedWord: this.state.selectedWord,
        selectedArea: "Europe",
        selectedWord: "",
      }),
    ]);
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    this.props.getTranslationById(translationId);
    this.props.history.push(`/edit_translation/${translationId}`);
  };

  isSafari = () => {
    const isSafari = navigator.userAgent.indexOf("Safari") > -1;
    this.setState({ isSafari: isSafari });
  };

  render() {
    //   const allAreas =
    //     this.props.languageAreaNames && this.props.languageAreaNames.length > 0
    //       ? this.props.languageAreaNames.map((area, index) => {
    //           return area ? <option key={index}>{area}</option> : null;
    //         })
    //       : null;
    const allWords =
      this.props.wordNames && this.props.wordNames.length > 0
        ? this.props.wordNames.map((word) => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    let shouldRender;
    if (
      this.props.wordDefinition.length &&
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
        </form>
        {shouldRender ? (
          <div>
            {/* <h3>Area: {this.state.searchedArea}</h3>
            <h3>Word: {this.state.searchedWord}</h3>
            <h3>Definition: {this.props.wordDefinition}</h3> */}
            <table id="table-title">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Word</th>
                  <th>Definition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.searchedArea}</td>
                  <td>{this.state.searchedWord}</td>
                  <td>{this.props.wordDefinition}</td>
                </tr>
              </tbody>
            </table>
            {this.state.isSafari ? (
              <a
                href={this.props.translationMapByEtymology}
                target="_blank"
                rel="noopener noreferrer"
              >
                <object
                  data={this.props.translationMapByEtymology}
                  type="image/svg+xml"
                  className="map"
                  alt="Europe map"
                  aria-label="Europe map"
                ></object>
              </a>
            ) : (
              <a
                href={this.props.translationMapByEtymology}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
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
