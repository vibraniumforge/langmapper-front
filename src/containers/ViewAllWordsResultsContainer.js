import React, { Component } from "react";
import ViewAllWordsResultCard from "../components/ViewAllWordsResultCard.js";

class ViewAllWordsResultsContainer extends Component {
  render() {
    const cards =
      this.props.words.length > 0
        ? this.props.words.map((word) => {
            return (
              <ViewAllWordsResultCard
                word={word}
                onHandleEdit={this.props.onHandleEdit}
                onHandleDelete={this.props.onHandleDelete}
                key={word.id}
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
