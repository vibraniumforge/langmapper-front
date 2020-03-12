import React from "react";
import TranslationsByMacrofamilyResultsContainer from "./TranslationsByMacrofamilyResultsContainer.js";

class TranslationsByMacrofamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFamily: "",
      results: [],
      macrofamilies: [],
      searchedFamily: ""
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/search/all_macrofamily_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          macrofamilies: res.data
        })
      )
      .catch(err => console.log(err));
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const family =
      this.state.selectedFamily === ""
        ? "Indo-European"
        : this.state.selectedFamily;
    fetch(
      `http://localhost:3001/api/v1/search/all_translations_by_macrofamily/${family}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.data,
          searchedFamily: this.state.selectedFamily,
          selectedFamily: ""
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const macrofamilies =
      this.state.macrofamilies && this.state.macrofamilies.length > 0
        ? this.state.macrofamilies.map((macrofamily, index) => {
            return macrofamily ? (
              <option key={index}>{macrofamily}</option>
            ) : null;
          })
        : null;
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          <select
            id="select"
            name="selectedFamily"
            value={this.state.selectedFamily}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Macrofamily</option>
            {macrofamilies}
          </select>
          <input
            disabled={!this.state.selectedFamily}
            type="submit"
            value="Search"
          />
        </form>
        <h3>{this.state.searchedFamily}</h3>
        <TranslationsByMacrofamilyResultsContainer
          selectedFamily={this.state.searchedFamily}
          results={this.state.results}
        />
      </>
    );
  }
}

export default TranslationsByMacrofamily;
