import React from "react";
import CreateEtymologyMapResultsContainer from "./CreateEtymologyMapResultsContainer.js";
// import europeCopyMap from "../images/europe_copy_template.svg";
const fs = require("fs");

class CreateEtymologyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "Europe",
      selectedWord: "silver",
      allWords: [],
      allLocations: [],
      results: [],
      searchedWord: "",
      searchedLocation: "",
      imageResults: []
    };
  }

  componentDidMount() {
    this.getAllWordNames();
    this.getAllAreas();
  }

  getAllWordNames() {
    fetch(`http://localhost:3001/api/v1/search/all_word_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allWords: res.data
        })
      )
      .catch(err => console.log(err));
  }

  getAllAreas() {
    fetch(`http://localhost:3001/api/v1/search/all_areas`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allLocations: res.data
        })
      )
      .catch(err => console.log(err));
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/v1/search/all_translations_by_area/${this.state.selectedLocation}/${this.state.selectedWord}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.data,
          searchedLocation: this.state.selectedLocation,
          searchedWord: this.state.selectedWord,
          selectedLocation: "",
          selectedWord: ""
        })
      )
      .catch(err => console.log(err));
    fetch(
      `http://localhost:3001/api/v1/search/all_translations_by_area_img/${this.state.selectedLocation}/${this.state.selectedWord}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          imageResults: res.data
        })
      )
      .catch(err => console.warn(err));
  };

  makeImg = () => {
    console.log("makeImg fires");
    // console.log(europeCopyMap);
    const resultsArray = [...this.state.imageResults];
    fs.writeFile("../images/europe_template_copy.svg", (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(data);
      }
    });
    let fileName = fs.writeFile("../images/europe_template_copy.svg");
    let counter = 0;
    for (let language in resultsArray) {
      console.log(`${language}, ${counter}`);
      fileName = fileName.replace("$" + language[0], resultsArray[counter][1]);
      counter++;
    }
  };

  render() {
    const allWords =
      this.state.allWords.length > 0
        ? this.state.allWords.map(word => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    const allLocations =
      this.state.allLocations && this.state.allLocations.length > 0
        ? this.state.allLocations.map((location, index) => {
            return location ? <option key={index}>{location}</option> : null;
          })
        : null;
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedLocation"
            value={this.state.selectedLocation}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Location</option>
            {allLocations}
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
        {/* <img src={europeCopyMap} alt="europe map" /> */}
        <CreateEtymologyMapResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
          searchedLocation={this.state.searchedLocation}
        />
      </>
    );
  }
}

export default CreateEtymologyMap;
