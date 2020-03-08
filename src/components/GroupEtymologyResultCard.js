import React, { Component } from "react";

class GroupEtymologyResultCard extends Component {
  render() {
    return (
      <div className="group-etymology-result-card">
        <p>
          <strong>Languages: </strong>
          {this.props.result[1].join(", ")}
        </p>
        <p>
          <strong>Etymology: </strong>
          {this.props.result[0] !== "Null"
            ? this.props.result[0]
            : "None Found"}
        </p>
      </div>
    );
  }
}

export default GroupEtymologyResultCard;
