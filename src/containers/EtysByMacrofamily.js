import React from "react";
import EtysByMacrofamilyContainer from "./EtysByMacrofamilyContainer.js";

class EtysByMacrofamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: "copper",
      results: [],
      searchedWord: "",
      macrofamilies: [],
      selectedFamily: ""
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
      `http://localhost:3001/api/v1/search/grouped_etymology/${this.state.formInput}/${family}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res,
          searchedWord: this.state.formInput,
          formInput: ""
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const macrofamilies =
      this.state.macrofamilies && this.state.macrofamilies.length > 0
        ? this.state.macrofamilies.map((macrofamily, index) => {
            return macrofamily.macrofamily ? (
              <option key={index}>{macrofamily.macrofamily}</option>
            ) : null;
          })
        : null;
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          <input
            type="text"
            id="search"
            name="formInput"
            placeholder="Search here"
            className="input"
            onChange={e => this.handleOnChange(e)}
            value={this.state.formInput}
          />
          <select
            id="select"
            name="selectedFamily"
            value={this.state.formInput}
            onChange={this.handleOnChange}
          >
            <option value="">Select One</option>
            {macrofamilies}
          </select>
          <input
            disabled={!this.state.formInput}
            type="submit"
            value="Search"
          />
        </form>
        <EtysByMacrofamilyContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
        />
      </>
    );
  }
}

export default EtysByMacrofamily;
