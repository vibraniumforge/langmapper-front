import React, { Component } from "react";

class TranslationByAreaResultCard extends Component {
  render() {
    return (
      <div className="translation-result-card">
        <p>
          <strong>Language: </strong>
          {this.props.translation.name}
        </p>
        <p>
          <strong>Macrofamily: </strong>
          {this.props.translation.macrofamily}
        </p>
        <p>
          <strong>Family: </strong>
          {this.props.translation.family}
        </p>
        <p>
          <strong>Subfamily: </strong>
          {this.props.translation.subfamily}
        </p>
        <p>
          <strong>Translation: </strong>
          {this.props.translation.translation}
        </p>
        <p>
          <strong>Romanization: </strong>
          {this.props.translation.romanization}
        </p>
        <p>
          <strong>Gender: </strong>
          {this.props.translation.gender}
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

export default TranslationByAreaResultCard;
