import React, { Component } from "react";
import ViewAllWordsResultCard from "../components/ViewAllWordsResultCard.js";

class ViewAllWordsResultsContainer extends Component {
  render() {
    const cards =
      this.props.results.length > 0
        ? this.props.results.map(translation => {
            return (
              <ViewAllWordsResultCard
                translation={translation}
                onHandleDelete={this.props.onHandleDelete}
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

export default ViewAllWordsResultsContainer;
