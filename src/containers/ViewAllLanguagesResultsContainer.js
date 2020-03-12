import React, { Component } from "react";
import ViewAllLanguagesResultCard from "../components/ViewAllLanguagesResultCard.js";

class ViewAllLanguagessResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(language => {
            return (
              <ViewAllLanguagesResultCard
                language={language}
                onHandleDelete={this.props.onHandleDelete}
                onHandleEdit={this.props.onHandleEdit}
                key={language.id}
              />
            );
          })
        : null;

    return (
      <>
        <h3>All Languages</h3>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default ViewAllLanguagessResultsContainer;
