import React from "react";
import EtymologyResultsContainer from "./EtymologyResultsContainer.js";

class SearchEtymologies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: "Celtic",
      results: [],
      searchedWord: ""
    };
  }

  handleOnChange = e => {
    this.setState({ formInput: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/v1/search/etymology/${this.state.formInput}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState(
          { results: res, searchedWord: this.state.formInput, formInput: "" },
          () => console.log(this.state)
        )
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          <input
            type="text"
            id="search"
            placeholder="Search here"
            className="input"
            onChange={e => this.handleOnChange(e)}
            value={this.state.formInput}
          />
          <input type="submit" value="Search" />
        </form>
        <EtymologyResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
        />
      </>
    );
  }
}

export default SearchEtymologies;
