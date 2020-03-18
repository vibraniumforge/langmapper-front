import React, { Component } from "react";

class ViewAllWordsResultCard extends Component {
  render() {
    return (
      <div className="translation-result-card">
        <p>
          <strong>ID: </strong>
          {this.props.translation.id}
        </p>
        <p>
          <strong>Name: </strong>
          {this.props.translation.word_name}
        </p>
        <p>
          <strong>Definition: </strong>
          {this.props.translation.definition}
        </p>
        <button
          onClick={e => this.props.onHandleDelete(e, this.props.translation.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default ViewAllWordsResultCard;
