import React from "react";
import SearchAllTranslationsResultsContainer from "./SearchAllTranslationsResultsContainer.js";

const REACT_APP_URL = process.env.REACT_APP_URL;

class SearchAllTranslations extends React.Component {
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
    fetch(`${REACT_APP_URL}/search/all_word_names`)
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
    fetch(
      `${REACT_APP_URL}/search/translation/${this.state.selectedWord.toLowerCase()}`
    )
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
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled"}
            disabled={!this.state.selectedWord}
          />
        </form>
        <SearchAllTranslationsResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
        />
      </>
    );
  }
}

export default SearchAllTranslations;
