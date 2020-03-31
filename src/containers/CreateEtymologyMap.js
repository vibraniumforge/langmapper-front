import React from "react";
import CreateEtymologyMapResultsContainer from "./CreateEtymologyMapResultsContainer.js";

// const REACT_APP_URL = process.env.REACT_APP_URL;
const url = "http://localhost:3001/api/v1";
// const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

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
      imageResults: ""
    };
  }

  componentDidMount() {
    this.getAllWordNames();
    this.getAllAreas();
  }

  getAllWordNames() {
    fetch(`${url}/search/all_word_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allWords: res.data
        })
      )
      .catch(err => console.log(err));
  }

  getAllAreas() {
    fetch(`${url}/search/all_areas`)
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
      `${url}/search/all_translations_by_area/${this.state.selectedLocation}/${this.state.selectedWord}`
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
      `${url}/search/all_etymologies_by_area_img/${this.state.selectedLocation}/${this.state.selectedWord}`
    )
      .then(res => res.blob())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(images => {
        let outside = URL.createObjectURL(images);
        console.log("outside=", outside);
        this.setState({ imageResults: outside });
      })
      .catch(err => console.warn(err));
  };

  onHandleEdit = (e, translationId) => {
    e.preventDefault();
    console.log("translationId=", translationId);
    this.props.history.push(`/edit_translation/${translationId}`);
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
        <h3>Location: {this.state.searchedLocation}</h3>
        <h3>Word: {this.state.searchedWord}</h3>
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

export default CreateEtymologyMap;
