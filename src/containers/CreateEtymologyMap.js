import React from "react";
import CreateEtymologyMapResultsContainer from "./CreateEtymologyMapResultsContainer.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getWordNames, getWordDefinition } from "../actions/wordActions.js";
import { searchTranslationsByArea } from "../actions/translationActions.js";

class CreateEtymologyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "Europe",
      selectedWord: "",
      searchedWord: "",
      searchedLocation: "",
      imageResults: "",
      definition: "",
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
    this.props.searchTranslationsByArea(
      this.state.selectedLocation,
      this.state.selectedWord
    );

    this.setState({
      searchedLocation: this.state.selectedLocation,
      searchedWord: this.state.selectedWord,
      //   selectedLocation: "",
      //   selectedWord: ""
    });

    // fetch(
    //   `${url}/search/all_etymologies_by_area_img/${this.state.selectedLocation}/${this.state.selectedWord}`
    // )
    //   .then((res) => res.blob())
    //   .then((images) => {
    //     let outside = URL.createObjectURL(images);
    //     this.setState({ imageResults: outside });
    //   })
    //   .catch((err) => console.warn(err));
    this.props.getWordDefinition(this.state.selectedWord);
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
    // const allLocations =
    //   this.state.allLocations && this.state.allLocations.length > 0
    //     ? this.state.allLocations.map((location, index) => {
    //         return location ? <option key={index}>{location}</option> : null;
    //       })
    //     : null;
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedLocation"
            value={this.state.selectedLocation}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Location</option>
            {/* {allLocations} */}
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
              this.state.selectedLocation && this.state.selectedWord
                ? "submit-btn"
                : "disabled"
            }
            disabled={!this.state.selectedLocation || !this.state.selectedWord}
          />
        </form>
        {/* <h3>Location: {this.state.searchedLocation}</h3> */}
        <h3>Word: {this.state.searchedWord}</h3>
        <h3>Definition: {this.state.definition}</h3>
        {this.state.imageResults ? (
          <img src={this.state.imageResults} alt="europe language map" />
        ) : null}
        <CreateEtymologyMapResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
          searchedLocation={this.state.searchedLocation}
          onHandleEdit={this.onHandleEdit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  wordNames: state.words.wordNames,
  searchedTranslationsByArea: state.translations.searchedTranslationsByArea,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWordNames,
      searchTranslationsByArea,
      getWordDefinition,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEtymologyMap)
);
