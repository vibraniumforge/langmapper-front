import React, { Component } from "react";

class TranslationsByMacrofamilyCard extends Component {
  render() {
    return (
      <div className="etymology-result-card">
        <p>
          <strong>Language: </strong>
          {this.props.result.name}
        </p>
        <p>
          <strong>Word name: </strong>
          {this.props.result.word_name}
        </p>
        <p>
          <strong>Translation: </strong>
          {this.props.result.translation}
        </p>
        <p>
          <strong>Romanization: </strong>
          {this.props.result.romanization}
        </p>
        <p>
          <strong>Gender: </strong>
          {this.props.result.gender ? this.props.result.gender : null}
        </p>
        <a href={this.props.result.link}>Wiktionary</a>
        <p>
          <strong>Etymology: </strong>
          {this.props.result.etymology
            ? this.props.result.etymology.slice(0, 140)
            : "None found"}
        </p>
      </div>
    );
  }
}

export default TranslationsByMacrofamilyCard;
