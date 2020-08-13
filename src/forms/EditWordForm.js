import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { editWord, clearGetWordById } from "../actions/wordActions.js";

class EditWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      wordDefinition: "",
      isChanged: false,
    };
  }

  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     if (nextProps.wordDefinition !== prevState.wordDefinition) {
  //       return { wordDefinition: nextProps.wordDefinition };
  //     } else {
  //       return null;
  //     }
  //   }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.wordDefinition !== nextProps.wordDefinition) {
      if (nextProps.wordDefinition === null) {
        this.setState({ wordDefinition: " " });
      } else {
        this.setState({ wordDefinition: nextProps.wordDefinition });
      }
    }
    if (
      this.props.wordDefinition &&
      this.props.wordDefinition.length > 0
      //   && this.props.wordDefinition !== nextProps.wordDefinition
    ) {
      this.setState({ wordDefinition: this.props.wordDefinition });
    }
  }

  //   componentDidUpdate(prevProps) {
  //     console.log(this.state);
  //     if (
  //       this.props.wordDefinition &&
  //       this.props.wordDefinition !== prevProps.wordDefinition
  //     ) {
  //       this.setState(
  //         {
  //           wordDefinition: this.props.wordDefinition,
  //         },
  //         () => console.log(this.state)
  //       );
  //     }
  //   }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (!this.state.isChanged) {
      this.setState({ isChanged: true });
    }
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const word = {
      //   definition: this.state.wordToUpdate.definition,
      definition: this.state.wordDefinition,
    };
    const wordId = this.props.location.pathname.split("/").pop();
    this.props.editWord(wordId, word);
    this.clearForm();
    this.props.history.push("/all_words");
  };

  clearForm = () => {
    this.setState({ wordDefinition: "" });
    this.props.clearGetWordById();
  };

  cancelFormAction = () => {
    this.props.history.push("/all_words");
    this.clearForm();
  };

  render() {
    // return this.props.wordDefinition ||
    //   (!this.props.wordDefinition && this.state.wordDefinition) ? (
    return this.props.wordToUpdate &&
      this.props.wordToUpdate.word_name &&
      this.props.wordToUpdate.word_name.length > 0 ? (
      <div>
        <form id="edit-word-form" onSubmit={(e) => this.handleOnSubmit(e)}>
          <h2>
            {/* Edit:{" "}
            {this.props.wordToUpdate
              ? this.props.wordToUpdate.word_name.charAt(0).toUpperCase() +
                this.props.wordToUpdate.word_name.slice(1)
              : null} */}
            Edit a Word
          </h2>
          <div className="form-row">
            <div className="full-col">
              <h3>Word ID: {this.props.wordToUpdate.id || ""} </h3>
            </div>
          </div>
          <div className="full-col">
            <label className="same-line" htmlFor="word-name">
              Word:
            </label>
            <input
              id="word-name"
              type="text"
              value={this.props.wordToUpdate.word_name || ""}
              onChange={this.handleOnChange}
              disabled
            />
          </div>
          <div className="form-row">
            <div className="full-col">
              <label className="same-line" htmlFor="word-definition">
                Edit Definintion:{" "}
              </label>
              <input
                id="word-definition"
                type="text"
                name="wordDefinition"
                placeholder="Enter definition here"
                value={this.state.wordDefinition || ""}
                onChange={this.handleOnChange}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className={
              this.state.wordDefinition && this.state.isChanged
                ? "submit-btn"
                : "disabled-btn"
            }
            disabled={!this.state.wordDefinition && !this.state.isChanged}
          />
          <button type="button" className="clear-btn" onClick={this.clearForm}>
            Clear Form
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={this.cancelFormAction}
          >
            Cancel
          </button>
        </form>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    wordDefinition: state.words.wordToUpdate.definition,
    wordToUpdate: state.words.wordToUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editWord, clearGetWordById }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditWordForm)
);
