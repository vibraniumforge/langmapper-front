import React, { Component } from "react";

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = 'http://localhost:3001/api/v1'
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class WordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordName: "",
      allWords: [],
      ableToSubmit: null,
    };
  }

  componentDidMount() {
    this.getAllWordNames();
  }

  getAllWordNames() {
    fetch(`${url}/search/all_word_names`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          allWords: res.data.map((word) => word.word_name),
        })
      )
      .catch((err) => console.log(err));
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.ableToSubmit()
    );
  };

  ableToSubmit = () => {
    if (this.state.allWords.includes(this.state.wordName.toLowerCase())) {
      this.setState({ ableToSubmit: false });
    } else {
      this.setState({ ableToSubmit: true });
    }
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.ableToSubmit) {
      fetch(`${url}/words/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: { word_name: this.state.wordName } }),
      })
        .then((res) => res.json())
        .then(this.clearForm())
        .catch((err) => console.log(err));
    }
  };

  clearForm = () => {
    this.setState({ wordName: "" });
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <label htmlFor="word-name">New Word: </label>
          <input
            id="word-name"
            type="text"
            name="wordName"
            placeholder="Enter word here"
            className={this.state.ableToSubmit === false ? "input-error" : ""}
            value={this.state.wordName}
            onChange={this.handleOnChange}
          />
          <div
            className={
              this.state.ableToSubmit === false
                ? "error-message"
                : "error-message-hidden"
            }
          >
            {this.state.ableToSubmit === false ? "Word Already Exists" : ""}
          </div>
          <input
            type="submit"
            value="Submit"
            className={
              this.state.wordName && this.state.ableToSubmit
                ? "submit-btn"
                : "disabled"
            }
            disabled={!this.state.wordName}
          />
        </form>
      </>
    );
  }
}

export default WordForm;
