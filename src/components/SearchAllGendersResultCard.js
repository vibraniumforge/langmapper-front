import React, { Component } from "react";

class SearchAllGendersResultCard extends Component {
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
      <div className={`gender-result-card ${genderClass}`}>
        <p>
          <strong>Family: </strong> {this.props.translation.language.family}
        </p>
        <p>
          <strong>Language: </strong> {this.props.translation.language.name}
        </p>
        <p>
          <strong>Translation: </strong> {this.props.translation.romanization}
        </p>
        <p>
          <strong>Romanization: </strong> {this.props.translation.romanization}
        </p>
        <p>
          <strong>Gender: </strong>
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

export default SearchAllGendersResultCard;
