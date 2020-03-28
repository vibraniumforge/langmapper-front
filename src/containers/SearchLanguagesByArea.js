import React from "react";
import AreaResultsContainer from "./AreaResultsContainer.js";

class SearchLanguagesByArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "",
      allLocations: [],
      searchedLocation: "",
      results: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1//search/all_areas`)
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
      `http://localhost:3001/api/v1/search/all_languages_by_area/${this.state.selectedLocation}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.data,
          selectedArea: "",
          selectedLocation: "",
          searchedArea: this.state.selectedArea,
          searchedLocation: this.state.selectedLocation
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const allLocations =
      this.state.allLocations && this.state.allLocations.length > 0
        ? this.state.allLocations.map((location, index) => {
            return location ? <option key={index}>{location}</option> : null;
          })
        : null;
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          {/* <select
            id="select"
            name="selectedArea"
            value={this.state.selectedArea}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Area</option>
            <option value="area">Area 1</option>
            <option value="area2">Area 2</option>
            <option value="area3">Area 3</option>
          </select> */}
          <select
            id="select"
            name="selectedLocation"
            value={this.state.selectedLocation}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Location</option>
            {allLocations}
          </select>
          <input
            disabled={!this.state.selectedLocation}
            type="submit"
            value="Search"
            className={this.state.selectedLocation ? "submit-btn" : "disabled"}
          />
        </form>
        <AreaResultsContainer
          results={this.state.results}
          searchedLocation={this.state.searchedLocation}
        />
      </>
    );
  }
}

export default SearchLanguagesByArea;
