import React from "react";
import TranslationsByAreaResultsContainerText from "./TranslationsByAreaResultsContainerText.js";

class SearchTranslationsByAreaText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "Europe",
      selectedWord: "copper",
      allWords: [],
      allLocations: [],
      results: [],
      searchedWord: "",
      searchedLocation: ""
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/search/all_word_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allWords: res.data
        })
      )
      .catch(err => console.log(err));
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
      `http://localhost:3001/api/v1/search/all_translations_by_area_text/${this.state.selectedLocation}/${this.state.selectedWord}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState(
          {
            results: res.data,
            searchedLocation: this.state.selectedLocation,
            searchedWord: this.state.selectedWord,
            selectedLocation: "",
            selectedWord: ""
          },
          () => console.log(this.state)
        )
      )
      .catch(err => console.log(err));
  };

  render() {
    const allWords =
      this.state.allWords.length > 0
        ? this.state.allWords.map(word => {
            return <option key={word.id}>{word.name}</option>;
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
            disabled={!this.state.searchedLocation && !this.state.selectedWord}
            type="submit"
            value="Search"
          />
        </form>
        <TranslationsByAreaResultsContainerText
          results={this.state.results}
          searchedWord={this.state.searchedWord}
          searchedLocation={this.state.searchedLocation}
        />
      </>
    );
  }
}

export default SearchTranslationsByAreaText;
