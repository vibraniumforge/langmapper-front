import React, { Component } from "react";
import ViewAllLanguagesResultCard from "../components/ViewAllLanguagesResultCard.js";

class ViewAllLanguagessResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <ViewAllLanguagesResultCard
                translation={translation}
                onHandleDelete={this.props.onHandleDelete}
                onHandleEdit={this.props.onHandleEdit}
                key={translation.id}
              />
            );
          })
        : null;

    return (
      <>
        <div id="card-container">{cards}</div>
      </>
    );
  }
}

export default ViewAllLanguagessResultsContainer;
