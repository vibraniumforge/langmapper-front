import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { editWord } from "../actions/wordActions.js";

class EditWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordDefinition: "",
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
    if (this.props.wordDefinition && this.props.wordDefinition.length > 0) {
      this.setState({ wordDefinition: this.props.wordDefinition });
    }
    if (this.props.wordDefinition !== nextProps.wordDefinition) {
      if (nextProps.wordDefinition === null) {
        this.setState({ wordDefinition: " " });
      } else {
        this.setState({ wordDefinition: nextProps.wordDefinition });
      }
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
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const word = {
      definition: this.state.wordToUpdate.definition,
    };
    const wordId = this.props.location.pathname.split("/").pop();
    this.props.editWord(wordId, word);
    this.clearForm();
    this.props.history.push("/all_words");
  };

  clearForm = () => {
    this.setState({ wordDefinition: "" });
  };

  cancelFormAction = () => {
    this.props.history.push("/all_words");
    this.clearForm();
    this.props.clearGetWordById();
  };

  render() {
    return this.props.wordDefinition ||
      (!this.props.wordDefinition && this.state.wordDefinition) ? (
      <div>
        <form id="edit-word-form" onSubmit={(e) => this.handleOnSubmit(e)}>
          <h2>
            Edit:{" "}
            {this.props.wordToUpdate
              ? this.props.wordToUpdate.word_name.charAt(0).toUpperCase() +
                this.props.wordToUpdate.word_name.slice(1)
              : null}
          </h2>
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
              this.state.wordDefinition ? "submit-btn" : "disabled-btn"
            }
            disabled={!this.state.wordDefinition}
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
  return bindActionCreators({ editWord }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditWordForm)
);
