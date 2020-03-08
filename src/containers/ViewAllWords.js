import React, { Component } from "react";
import ViewAllWordsResultsContainer from "./ViewAllWordsResultsContainer.js";

const url = `http://localhost:3001/api/v1/words`;
class ViewAllWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.getWords();
  }

  getWords = () => {
    fetch(`${url}`)
      .then(res => res.json())
      .then(res => this.setState({ results: res }))
      .catch(err => console.log(err));
  };

  onHandleDelete = (e, wordId) => {
    e.preventDefault();
    fetch(`${url}/${wordId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => this.deleteWord(res))
      .catch(err => console.log(err));
  };

  deleteWord = res => {
    const wordId = res.data.id;
    let wordsAr = [...this.state.results];
    let newWordsAr = wordsAr.filter(word => {
      return word.id !== wordId;
    });
    this.setState({ results: newWordsAr });
  };

  render() {
    return (
      <>
        <ViewAllWordsResultsContainer
          onHandleDelete={this.onHandleDelete}
          results={this.state.results}
        />
      </>
    );
  }
}

export default ViewAllWords;
