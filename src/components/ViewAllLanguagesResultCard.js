import React, { Component } from "react";

class ViewAllLanguagesResultCard extends Component {
  render() {
    return (
      <div className="language-result-card">
        <p>
          <strong>ID: </strong>
          {this.props.language.id}
        </p>
        <p>
          <strong>Name: </strong>
          {this.props.language.name}
        </p>
        <p>
          <strong>Abbreviation: </strong>
          {this.props.language.abbreviation}
        </p>
        <p>
          <strong>Alphabet: </strong>
          {this.props.language.alphabet}
        </p>
        <p>
          <strong>Macrofamily: </strong>
          {this.props.language.macrofamily}
        </p>
        <p>
          <strong>Family: </strong>
          {this.props.language.family}
        </p>
        <p>
          <strong>Subfamily:</strong> {this.props.language.subfamily}
        </p>
        <p>
          <strong>Area 1: </strong>
          {this.props.language.area1}
        </p>
        <p>
          <strong>Area 2: </strong>
          {this.props.language.area2}
        </p>
        <p>
          <strong>Area 3: </strong>
          {this.props.language.area3}
        </p>
        <p>
          <strong>Notes: </strong>
          {this.props.language.notes}
        </p>
        <p>
          <strong>Alive: </strong>
          {this.props.language.alive === "f" ||
          this.props.language.alive === false
            ? "false"
            : "true"}
        </p>
        {/* <button
          onClick={e => this.props.onHandleEdit(e, this.props.language.id)}
          className="card-edit-btn"
        >
          Edit
        </button>
        <button
          onClick={e => this.props.onHandleDelete(e, this.props.language.id)}
          className="card-delete-btn"
        >
          Delete
        </button> */}
      </div>
    );
  }
}

export default ViewAllLanguagesResultCard;
