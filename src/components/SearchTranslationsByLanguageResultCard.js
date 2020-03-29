import React, { Component } from "react";

class SearchTranslationsByLanguageResultCard extends Component {
  render() {
    return (
      <div className="translation-result-card">
        <p>
          <strong>Word: </strong>
          {this.props.translation.word_name}
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
        <button
          onClick={e => this.props.onHandleEdit(e, this.props.translation.id)}
          className="card-edit-btn"
        >
          Edit
        </button>
      </div>
    );
  }
}

export default SearchTranslationsByLanguageResultCard;
