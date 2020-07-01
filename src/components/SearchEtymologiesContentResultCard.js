import React, { Component } from "react";

class SearchEtymologiesContentResultCard extends Component {
  render() {
    return (
      <div className="translation-result-card">
        <p>
          <strong>Word: </strong> {this.props.translation.word.word_name}
        </p>
        <p>
          <strong>Language: </strong> {this.props.translation.language.name}
        </p>
        <p>
          <strong>Translation: </strong> {this.props.translation.translation}
        </p>
        <p>
          <strong>Romanization: </strong> {this.props.translation.romanization}
        </p>
        <a href={this.props.translation.link}>Wiktionary</a>
        <p>
          <strong>Etymology: </strong>
          {this.props.translation.etymology
            ? this.props.translation.etymology + "..."
            : "None found"}
        </p>
      </div>
    );
  }
}

export default SearchEtymologiesContentResultCard;
