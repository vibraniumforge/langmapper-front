import React, { Component } from "react";

class TranslationByLanguageResultCard extends Component {
  render() {
    return (
      <div className="translation-result-card">
        <p>Language: {this.props.translation.language_name}</p>
        <p>Translation: {this.props.translation.translation}</p>
        <p>Romanization: {this.props.translation.romanization}</p>
        <a href={this.props.translation.link}>Wiktionary</a>
        <p>
          Etymology:{" "}
          {this.props.translation.etymology
            ? this.props.translation.etymology.slice(0, 140)
            : "None found"}
        </p>
      </div>
    );
  }
}

export default TranslationByLanguageResultCard;
