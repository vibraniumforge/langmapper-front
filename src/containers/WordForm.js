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
    fetch(`http://localhost:3001/api/v1/words/?name=${this.state.wordName}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: this.state.wordName })
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <form onSubmit={e => this.handleOnSubmit(e)}>
          <label htmlFor="word-name">Word: </label>
          <input
            id="word-name"
            type="text"
            name="wordName"
            placeholder="Enter word here"
            value={this.state.wordName}
            onChange={this.handleOnChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default WordForm;
