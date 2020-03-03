import React, { Component } from "react";

class ResultCard extends Component {
  render() {
    return (
      <>
        <h3>{this.props.word.requested_word}</h3>
        <p>Language: {this.props.word.language}</p>
        <p>Translation: {this.props.word.language}</p>
        <p>Link: {this.props.word.link}</p>
        <p>Etymology: {this.props.word.etymology}</p>
      </>
    );
  }
}

// Word.create({requested_word: "gold", language: "fr", alphabet: "latin", translation: "or", romanization: "", link: "www."})

export default ResultCard;
