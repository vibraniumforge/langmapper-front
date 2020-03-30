import React from "react";
import SearchTranslationsByLanguageResultsContainer from "./SearchTranslationsByLanguageResultsContainer.js";

class SearchTranslationsByLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "",
      results: [],
      searchedLanguage: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      selectedLanguage: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/v1/search/all_translations_by_language/${this.state.selectedLanguage}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.data,
          searchedLanguage: this.state.selectedLanguage,
          selectedLanguage: ""
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
            value={this.state.selectedLanguage}
          />
          <input
            type="submit"
            value="Search"
            disabled={!this.state.selectedLanguage}
            className={this.state.selectedLanguage ? "submit-btn" : "disabled"}
          />
        </form>
        <SearchTranslationsByLanguageResultsContainer
          results={this.state.results}
          searchedLanguage={this.state.searchedLanguage}
        />
      </>
    );
  }
}

export default SearchTranslationsByLanguage;
