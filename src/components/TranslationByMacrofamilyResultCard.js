import React, { Component } from "react";

class TranslationsByMacrofamilyCard extends Component {
  render() {
    return (
      <div className="etymology-result-card">
        <p>Language: {this.props.result.name}</p>
        <p>Word name: {this.props.result.word_name}</p>
        <p>Translation: {this.props.result.translation}</p>
        <p>Romanization: {this.props.result.romanization}</p>
        <p>
          Gender: {this.props.result.gender ? this.props.result.gender : null}
        </p>
        <a href={this.props.result.link}>Wiktionary</a>
        <p>
          Etymology:{" "}
          {this.props.result.etymology
            ? this.props.result.etymology.slice(0, 140)
            : "None found"}
        </p>
      </div>
    );
  }
}

export default TranslationsByMacrofamilyCard;
