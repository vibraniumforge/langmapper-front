import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  editLanguage,
  getAllAlphabets,
  getAllMacrofamilyNames,
} from "../actions/languageActions.js";

class LanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      abbreviation: "",
      alphabet: "",
      macrofamily: "",
      family: "",
      subfamily: "",
      area1: "",
      area2: "",
      area3: "",
      notes: "",
      alive: "",
      alphabetNames: [],
      macrofamilyNames: [],
    };
  }

  componentDidMount() {
    Promise.all([
      this.props.getAllAlphabets(),
      this.props.getAllMacrofamilies(),
    ]);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.languageToUpdate !== nextProps.languageToUpdate) {
      this.setState(
        {
          name: nextProps.languageToUpdate.name,
          abbreviation: nextProps.languageToUpdate.abbreviation,
          alphabet: nextProps.languageToUpdate.alphabet,
          macrofamily: nextProps.languageToUpdate.macrofamily,
          family: nextProps.languageToUpdate.family,
          subfamily: nextProps.languageToUpdate.subfamily,
          area1: nextProps.languageToUpdate.area1,
          area2: nextProps.languageToUpdate.area2,
          area3: nextProps.languageToUpdate.area3,
          notes: nextProps.languageToUpdate.notes,
          alive: nextProps.languageToUpdate.alive,
          alphabetNames: nextProps.alphabetNames,
          macrofamilyNames: nextProps.macrofamilyNames,
        },
        () => console.log(this.state)
      );
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const languageId = this.props.location.pathname.split("/").pop();
    const editedLanguage = {
      name: this.state.name,
      abbreviation: this.state.abbreviation,
      alphabet: this.state.alphabet,
      macrofamily: this.state.macrofamily,
      family: this.state.family,
      subfamily: this.state.subfamily,
      area1: this.state.area1,
      area2: this.state.area2,
      area3: this.state.area3,
      notes: this.state.notes,
      alive:
        this.state.alive === "t" || this.state.alive === true ? true : false,
    };
    this.props.editLanguage(languageId, editedLanguage);
    this.clearForm();
    this.props.history.push("/all_languages");
  };

  cancelFormAction = () => {
    this.props.history.push("/all_languages");
  };

  clearForm = () => {
    this.setState({
      name: "",
      abbreviation: "",
      alphabet: "",
      macrofamily: "",
      family: "",
      subfamily: "",
      area1: "",
      area2: "",
      area3: "",
      notes: "",
      alive: "",
      macrofamilyNames: [],
      alphabetNames: [],
    });
  };

  render() {
    const alphabets =
      this.props.alphabetNames && this.props.alphabetNames.length > 0
        ? this.props.alphabetNames.map((alphabet, index) => {
            return <option key={index}>{alphabet}</option>;
          })
        : null;
    const macrofamilies =
      this.props.macrofamilyNames && this.props.macrofamilyNames.length > 0
        ? this.props.macrofamilyNames.map((macrofamily, index) => {
            return <option key={index}>{macrofamily}</option>;
          })
        : null;

    return this.props.languageToUpdate && alphabets && macrofamilies ? (
      <>
        <form id="new-lang-form" onSubmit={(e) => this.handleOnSubmit(e)}>
          <h3>Edit a Language</h3>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Language Name"
              value={this.state.name || ""}
              onChange={this.handleOnChange}
            />
            <label htmlFor="abbreviation">Abbreviation: </label>
            <input
              type="text"
              id="abbreviation"
              name="abbreviation"
              placeholder="Language Abbreviation"
              value={this.state.abbreviation || ""}
              onChange={this.handleOnChange}
            />
            <label htmlFor="alphabet">Alphabet: </label>
            <select
              id="alphabet"
              name="alphabet"
              value={this.state.alphabet || ""}
              onChange={this.handleOnChange}
            >
              <option value="">Select One Alphabet</option>
              {alphabets}
            </select>
          </div>
          <div>
            <label htmlFor="macrofamily">Macrofamily: </label>
            <select
              id="macrofamily"
              name="macrofamily"
              value={this.state.macrofamily || ""}
              onChange={this.handleOnChange}
            >
              <option value="">Select One Macrofamily</option>
              {macrofamilies}
            </select>

            <label htmlFor="family">Family: </label>
            <input
              type="text"
              id="family"
              name="family"
              placeholder="Language Family"
              value={this.state.family || ""}
              onChange={this.handleOnChange}
            />
            <label htmlFor="subfamily">Subfamily: </label>
            <input
              type="text"
              id="subfamily"
              name="subfamily"
              placeholder="Language Subfamily"
              value={this.state.subfamily || ""}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="area1">Area 1: </label>
            <input
              type="text"
              id="area1"
              name="area1"
              placeholder="Area 1"
              value={this.state.area1 || ""}
              onChange={this.handleOnChange}
            />
            <label htmlFor="area2">Area 2: </label>
            <input
              type="text"
              id="area2"
              name="area2"
              placeholder="Another Area?"
              value={this.state.area2 || ""}
              onChange={this.handleOnChange}
            />
            <label htmlFor="area3">Area 3: </label>
            <input
              type="text"
              id="area3"
              name="area3"
              placeholder="Another Area??"
              value={this.state.area3 || ""}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes: </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Notes"
              value={this.state.notes || ""}
              onChange={this.handleOnChange}
            />
            <label htmlFor="alive">Alive?: </label>
            <label>
              <input
                type="radio"
                name="alive"
                value="t"
                checked={this.state.alive === "t" || this.state.alive === true}
                onChange={this.handleOnChange}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="alive"
                value="f"
                checked={this.state.alive === "f" || this.state.alive === false}
                onChange={this.handleOnChange}
              />
              False
            </label>
          </div>
          <input
            type="submit"
            className={this.state.name ? "submit-btn" : "disabled"}
            value="Update"
            disabled={!this.state.name}
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
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  languageToUpdate: state.languages.languageToUpdate,
  alphabetNames: state.languages.alphabetNames,
  macrofamilyNames: state.languages.macrofamilyNames,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { editLanguage, getAllAlphabets, getAllMacrofamilyNames },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LanguageForm)
);
