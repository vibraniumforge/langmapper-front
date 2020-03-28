import React from "react";
import GroupEtymologyResultsContainer from "./GroupEtymologyResultsContainer.js";

class GroupEtymologies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      results: [],
      searchedWord: "",
      macrofamilies: [],
      selectedFamily: "",
      searchedFamily: "",
      allWords: []
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
    fetch(`http://localhost:3001/api/v1/search/all_word_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          allWords: res.data
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
      `http://localhost:3001/api/v1/search/grouped_etymology/${this.state.selectedWord}/${family}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.data,
          searchedWord: this.state.selectedWord,
          searchedFamily: this.state.selectedFamily,
          formInput: ""
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
    const macrofamilies =
      this.state.macrofamilies && this.state.macrofamilies.length > 0
        ? this.state.macrofamilies.map((macrofamily, index) => {
            return macrofamily ? (
              <option key={index}>{macrofamily}</option>
            ) : null;
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
          <select
            id="select"
            name="selectedFamily"
            value={this.state.selectedFamily}
            onChange={this.handleOnChange}
          >
            <option value="">Select One Macrofamily</option>
            {macrofamilies}
          </select>
          <input
            disabled={!this.state.selectedWord}
            type="submit"
            value="Search"
            className={this.state.selectedWord ? "submit-btn" : "disabled"}
          />
        </form>
        <GroupEtymologyResultsContainer
          results={this.state.results}
          searchedWord={this.state.searchedWord}
          searchedFamily={this.state.searchedFamily}
        />
      </>
    );
  }
}

export default GroupEtymologies;
