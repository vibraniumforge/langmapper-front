import React from "react";
import TranslationsResultsContainer from "./TranslationResultsContainer.js";

class SearchTranslations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: "goose",
      results: [],
      searchedWord: "goose" || this.state.formInput
    };
  }

  handleOnChange = e => {
    this.setState(
      { formInput: e.target.value, searchedWord: e.target.value },
      () => console.log(this.state)
    );
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/v1/search/translation/${this.state.formInput}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({ results: res, formInput: "" }, () =>
          console.log(this.state)
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
        <TranslationsResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
        />
      </>
    );
  }
}

export default SearchTranslations;
