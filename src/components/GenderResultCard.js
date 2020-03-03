import React, { Component } from "react";

class GenderResultCard extends Component {
  render() {
    let genderClass;
    switch (this.props.translation.gender) {
      case "m":
        genderClass = "male";
        break;
      case "f":
        genderClass = "female";
        break;
      default:
        genderClass = "neuter";
    }
    return (
      <div id="gender-result-card" className={genderClass}>
        <p>Family: {this.props.translation.family}</p>
        <p>Language: {this.props.translation.language}</p>
        <p>Translation: {this.props.translation.romanization}</p>
        <p>
          Gender:{" "}
          {this.props.translation.gender ? (
            <span className="">
              {this.props.translation.gender.toUpperCase()}
            </span>
          ) : (
            "None found"
          )}
        </p>
        <a href={this.props.translation.link}>Wiktionary</a>
      </div>
    );
  }
}

export default GenderResultCard;
