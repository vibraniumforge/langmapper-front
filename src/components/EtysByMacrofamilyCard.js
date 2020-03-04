import React, { Component } from "react";

class EtysByMacrofamilyCard extends Component {
  render() {
    return (
      <div className="group-etymology-result-card">
        <p>
          <b>Languages: </b>: {this.props.result[1].join(", ")}
        </p>
        <p>
          <b>Definition: </b>
          {this.props.result[0] !== "Null"
            ? this.props.result[0]
            : "None Found"}
        </p>
      </div>
    );
  }
}

export default EtysByMacrofamilyCard;
