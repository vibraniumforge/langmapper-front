import React from "react";
import SearchAllGendersResultsContainer from "./SearchAllGendersResultsContainer.js";

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = 'http://localhost:3001/api/v1'
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class SearchAllGenders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      results: [],
      searchedWord: "",
      allWords: []
    };
  }

  componentDidMount() {
    fetch(`${url}/search/all_word_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allWords: res.data
        })
      )
      .catch(err => console.log(err));
  }

  handleOnChange = e => {
    this.setState({
      selectedWord: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(`${url}/search/gender/${this.state.selectedWord}`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res,
          searchedWord: this.state.selectedWord,
          selectedWord: ""
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const allWords =
      this.state.allWords.length > 0
        ? this.state.allWords.map(word => {
            return <option key={word.id}>{word.word_name}</option>;
          })
        : null;
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
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
            disabled={!this.state.selectedWord}
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled"}
          />
        </form>
        <SearchAllGendersResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
        />
      </>
    );
  }
}

export default SearchAllGenders;
