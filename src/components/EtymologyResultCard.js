import React, { Component } from "react";

class EtymologyResultCard extends Component {
  render() {
    return (
      <div id="translation-result-card">
        <p>Language: {this.props.translation.language.name}</p>
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

export default EtymologyResultCard;
