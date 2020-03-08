import React, { Component } from "react";

class ViewAllLanguagesResultCard extends Component {
  render() {
    return (
      <div className="language-result-card">
        <p>
          <strong>ID: </strong>
          {this.props.translation.id}
        </p>
        <p>
          <strong>Name: </strong>
          {this.props.translation.name}
        </p>
        <p>
          <strong>Abbreviation: </strong>
          {this.props.translation.abbreviation}
        </p>
        <p>
          <strong>Alphabet: </strong>
          {this.props.translation.alphabet}
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
          <strong>Subfamily:</strong> {this.props.translation.subfamily}
        </p>
        <p>
          <strong>Area: </strong>
          {this.props.translation.area}
        </p>
        <p>
          <strong>Area 2: </strong>
          {this.props.translation.area2}
        </p>
        <p>
          <strong>Area 3: </strong>
          {this.props.translation.area3}
        </p>
        <p>
          <strong>Notes: </strong>
          {this.props.translation.notes}
        </p>
        <p>
          <strong>Alive: </strong>
          {this.props.translation.alive === "t" ? "true" : "false"}
        </p>

        <button
          onClick={e => this.props.onHandleDelete(e, this.props.translation.id)}
        >
          Delete
        </button>
        <button
          onClick={e => this.props.onHandleEdit(e, this.props.translation.id)}
        >
          Edit
        </button>
      </div>
    );
  }
}

export default ViewAllLanguagesResultCard;
