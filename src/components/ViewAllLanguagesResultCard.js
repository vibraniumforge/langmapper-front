import React, { Component } from "react";

class ViewAllLanguagesResultCard extends Component {
  render() {
    return (
      <div className="language-result-card">
        <p>ID: {this.props.translation.id}</p>
        <p>Name: {this.props.translation.name}</p>
        <p>Abbreviation: {this.props.translation.abbreviation}</p>
        <p>Alphabet: {this.props.translation.alphabet}</p>
        <p>Macrofamily: {this.props.translation.macrofamily}</p>
        <p>Family: {this.props.translation.family}</p>
        <p>Subfamily: {this.props.translation.subfamily}</p>
        <p>Area: {this.props.translation.area}</p>
        <p>Area 2: {this.props.translation.area2}</p>
        <p>Area 3: {this.props.translation.area3}</p>
        <p>Notes: {this.props.translation.notes}</p>
        <p>Alive: {this.props.translation.alive === "t" ? "true" : "false"}</p>

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
