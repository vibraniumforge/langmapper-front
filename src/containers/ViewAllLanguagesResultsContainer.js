import React, { Component } from "react";
import ViewAllLanguagesResultCard from "../components/ViewAllLanguagesResultCard.js";

class ViewAllLanguagessResultsContainer extends Component {
  render() {
    const cards =
      this.props.languages && this.props.languages.length > 0
        ? this.props.languages.map((language) => {
            return (
              <ViewAllLanguagesResultCard
                language={language}
                onHandleDelete={this.props.onHandleDelete}
                onHandleEdit={this.props.onHandleEdit}
                onHandleSubmit={this.props.onHandleSubmit}
                key={language.id}
              />
            );
          })
        : null;

    return (
      <>
        <h3>All Languages ({this.props.languages.length})</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default ViewAllLanguagessResultsContainer;
