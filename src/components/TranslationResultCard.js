import React, { Component } from "react";

class TranslationResultCard extends Component {
  render() {
    return (
      <div className="translation-result-card">
        <p>
          <strong>Language: </strong>
          {this.props.translation.language.name}
        </p>
        <p>
          <strong>Translation: </strong>
          {this.props.translation.translation}
        </p>
        <p>
          <strong>Romanization: </strong>
          {this.props.translation.romanization}
        </p>
        <a href={this.props.translation.link}>Wiktionary</a>
        <p>
          <strong>Etymology: </strong>
          {this.props.translation.etymology
            ? this.props.translation.etymology.slice(0, 140)
            : "None found"}
        </p>
      </div>
    );
  }
}

export default TranslationResultCard;
