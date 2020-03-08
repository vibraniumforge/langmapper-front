import React from "react";
import TranslationsResultsContainer from "./TranslationResultsContainer.js";

class SearchTranslations extends React.Component {
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
    // fetch(`http://localhost:3001/api/v1/words`)
    fetch(`http://localhost:3001/api/v1/search/all_word_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allWords: res
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
      `http://localhost:3001/api/v1/search/translation/${this.state.selectedWord}`
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
            return <option key={word.id}>{word.name}</option>;
          })
        : null;
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          {/* <input
            type="text"
            id="search"
            placeholder="Search here"
            className="input"
            onChange={e => this.handleOnChange(e)}
            value={this.state.formInput}
          /> */}
          <select
            id="select"
            name="selectedWord"
            value={this.state.selectedWord}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Word</option>
            {allWords}
          </select>
          <input type="submit" value="Search" />
        </form>
        <TranslationsResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
        />
      </>
    );
  }
}

export default SearchTranslations;
