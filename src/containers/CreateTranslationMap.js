import React from "react";
import CreateTranslationMapResultsContainer from "./CreateTranslationMapResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames, getWordDefinition } from "../actions/wordActions.js";

import { getAllLanguageAreaNames } from "../actions/languageActions.js";

import {
  searchTranslationsByArea,
  searchTranslationsByAreaImg,
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
    this.props.getWordDefinition(this.state.selectedWord);
    this.props.searchTranslationsByArea(
      this.state.selectedArea,
      this.state.selectedWord
    );
    this.props.searchTranslationsByAreaImg(
      this.state.selectedArea,
      this.state.selectedWord
    );
    this.setState({
      searchedArea: this.state.selectedArea,
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
    console.log("fires");
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
      this.props.translationMapByArea &&
      this.props.searchedTranslationsByArea.length
    ) {
      console.log("if fires");
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
            <option value="">Choose Area</option>
            {/* {allAreas} */}
            <option value="Europe">Europe</option>
          </select>
          <select
            id="select"
            name="selectedWord"
            value={this.state.selectedWord}
            onChange={this.handleOnChange}
          >
            <option value="">Choose Word</option>
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
              src={this.props.translationMapByArea}
              alt="europe language map"
              className="map"
            />
            <CreateTranslationMapResultsContainer
              searchedTranslationsByArea={this.props.searchedTranslationsByArea}
              searchedWord={this.state.searchedWord}
              searchedArea={this.state.searchedArea}
              onHandleEdit={this.onHandleEdit}
            />
          </div>
        ) : null}
        {/* should be spinner instead of null above */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  wordNames: state.words.wordNames,
  wordDefinition: state.words.wordDefinition,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
  translationMapByArea: state.translations.translationMapByArea,
  languageAreaNames: state.languages.languageAreaNames,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      getAllLanguageAreaNames,
      getWordDefinition,
      searchTranslationsByArea,
      searchTranslationsByAreaImg,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateTranslationMap)
);
