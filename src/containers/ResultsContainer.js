import React, { Component } from "react";
import ResultCard from "../components/ResultCard.js";

class ResultsContainer extends Component {
  render() {
    if (this.props.results.length > 0) {
      return this.props.results.map(word => {
        return <ResultCard word={word} key={word.id} />;
      });
    } else {
      return null;
    }
  }
}

export default ResultsContainer;
