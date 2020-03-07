import React from "react";
import TranslationsByLanguageResultsContainer from "./TranslationsByLanguageResultsContainer.js";

class SearchTranslationsByLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: "",
      results: [],
      searchedLanguage: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      formInput: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/v1/search/all_translations_by_language/${this.state.formInput}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.data,
          searchedLanguage: this.state.formInput,
          formInput: ""
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
            placeholder="Input Language: "
            className="input"
            onChange={e => this.handleOnChange(e)}
            value={this.state.formInput}
          />
          {/* <select
            id="select"
            name="selectedWord"
            value={this.state.selectedWord}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Word</option>
            {allWords}
          </select> */}
          <input type="submit" value="Search" />
        </form>
        <TranslationsByLanguageResultsContainer
          results={this.state.results}
          searchedLanguage={this.state.searchedLanguage}
        />
      </>
    );
  }
}

export default SearchTranslationsByLanguage;
