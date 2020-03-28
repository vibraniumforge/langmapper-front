import React, { Component } from "react";

class WordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordName: ""
    };
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/words/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ word: { word_name: this.state.wordName } })
    })
      .then(res => res.json())
      .then(this.clearForm())
      .catch(err => console.log(err));
  };

  clearForm = () => {
    this.setState({ wordName: "" });
  };

  render() {
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          <label htmlFor="word-name">New Word: </label>
          <input
            id="word-name"
            type="text"
            name="wordName"
            placeholder="Enter word here"
            value={this.state.wordName}
            onChange={this.handleOnChange}
          />
          <input
            type="submit"
            value="Submit"
            className={this.state.wordName ? "submit-btn" : "disabled"}
            disabled={!this.state.wordName}
          />
        </form>
      </>
    );
  }
}

export default WordForm;
