import React from "react";
import SearchEtymologiesContentResultsContainer from "./SearchEtymologiesContentResultsContainer.js";

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = 'http://localhost:3001/api/v1'
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class SearchEtymologiesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      results: [],
      selectedWord: ""
    };
  }

  handleOnChange = e => {
    this.setState({ searchWord: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(`${url}/search/etymology/${this.state.searchWord}`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res,
          selectedWord: this.state.searchWord,
          searchWord: ""
        })
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
            value={this.state.searchWord}
          />
          <input
            disabled={!this.state.searchWord}
            type="submit"
            value="Search"
            className={this.state.searchWord ? "submit-btn" : "disabled"}
          />
        </form>
        <SearchEtymologiesContentResultsContainer
          results={this.state.results}
          selectedWord={this.state.selectedWord}
        />
      </>
    );
  }
}

export default SearchEtymologiesContent;
