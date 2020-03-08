import React, { Component } from "react";

class ViewAllWordsResultCard extends Component {
  render() {
    return (
      <div className="translation-result-card">
        <p>ID: {this.props.translation.id}</p>
        <p>Name: {this.props.translation.name}</p>
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
