import React from "react";
import ResultsContainer from "./ResultsContainer.js";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: "gold",
      results: []
    };
  }

  handleOnChange = e => {
    this.setState({ formInput: e.target.value }, () => console.log(this.state));
  };

  handleOnSubmit = e => {
    console.log("handleOnSubmit fires");
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/search/?query=${this.state.formInput}`)
      .then(res => res.json())
      .then(res => this.setState({ results: res }))
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
        <ResultsContainer results={this.state.results} />
      </>
    );
  }
}

export default Search;
