import React from "react";
import CreateTranslationMapResultsContainer from "./CreateTranslationMapResultsContainer.js";
// import AreaSearchSelect from "../components/AreaSearchSelect.js";
import WordSearchSelect from "../components/WordSearchSelect.js";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames, getWordDefinition } from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  searchTranslationsByArea,
  searchTranslationsByAreaImg,
  isLoading,
} from "../actions/translationActions.js";

class CreateTranslationMap extends React.Component {
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

  //   shouldComponentUpdate() {
  //     debugger;
  //     return (
  //       this.props.wordNames > 0 ||
  //       (this.props.wordDefinition.length > 0 &&
  //         this.props.translationMapByArea &&
  //         this.props.translationMapByArea.length > 0 &&
  //         this.props.searchedTranslationsByArea.length > 0)
  //     );
  //   }

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
      this.props.searchTranslationsByAreaImg(
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
      this.props.translationMapByArea &&
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

            <a
              href={this.props.translationMapByArea}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={this.props.translationMapByArea}
                className="map"
                alt="Europe map"
              />
            </a>

            <CreateTranslationMapResultsContainer
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
  translationMapByArea: state.translations.translationMapByArea,
  isLoading: state.translations.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      getAllLanguageAreaNames,
      getWordDefinition,
      searchTranslationsByArea,
      searchTranslationsByAreaImg,
      isLoading,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateTranslationMap)
);
