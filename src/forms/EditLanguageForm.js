import React, { Component } from "react";
import Spinner from "../components/Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  editLanguage,
  getAllAlphabets,
  getAllMacrofamilyNames,
} from "../actions/languageActions.js";

import { isLoading } from "../actions/translationActions.js";

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
      this.props.getAllMacrofamilyNames(),
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
      <div className="">
        <form id="edit-language-form" onSubmit={(e) => this.handleOnSubmit(e)}>
          <h2>Edit a Language</h2>
          <div className="form-row">
            <div className="form-group one-third-col">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Language Name"
                value={this.state.name || ""}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group one-third-col">
              <label htmlFor="abbreviation">Abbreviation: </label>
              <input
                type="text"
                id="abbreviation"
                name="abbreviation"
                className="form-control"
                placeholder="Language Abbreviation"
                value={this.state.abbreviation || ""}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group one-third-col">
              <label htmlFor="alphabet">Alphabet: </label>
              <select
                id="alphabet"
                name="alphabet"
                className="form-control form-select"
                value={this.state.alphabet || ""}
                onChange={this.handleOnChange}
              >
                <option value="">Select One Alphabet</option>
                {alphabets}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group one-third-col">
              <label htmlFor="macrofamily">Macrofamily: </label>
              <select
                id="macrofamily"
                name="macrofamily"
                className="form-control form-select"
                value={this.state.macrofamily || ""}
                onChange={this.handleOnChange}
              >
                <option value="">Select One Macrofamily</option>
                {macrofamilies}
              </select>
            </div>
            <div className="form-group one-third-col">
              <label htmlFor="family">Family: </label>
              <input
                type="text"
                id="family"
                name="family"
                className="form-control"
                placeholder="Language Family"
                value={this.state.family || ""}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group one-third-col">
              <label htmlFor="subfamily">Subfamily: </label>
              <input
                type="text"
                id="subfamily"
                name="subfamily"
                className="form-control"
                placeholder="Language Subfamily"
                value={this.state.subfamily || ""}
                onChange={this.handleOnChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group one-third-col">
              <label htmlFor="area1">Area 1: </label>
              <input
                type="text"
                id="area1"
                name="area1"
                className="form-control"
                placeholder="Area 1"
                value={this.state.area1 || ""}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group one-third-col">
              <label htmlFor="area2">Area 2: </label>
              <input
                type="text"
                id="area2"
                name="area2"
                className="form-control"
                placeholder="Another Area?"
                value={this.state.area2 || ""}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group one-third-col">
              <label htmlFor="area3">Area 3: </label>
              <input
                type="text"
                id="area3"
                name="area3"
                className="form-control"
                placeholder="Another Area??"
                value={this.state.area3 || ""}
                onChange={this.handleOnChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-col">
              <label htmlFor="notes">Notes: </label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Notes"
                value={this.state.notes || ""}
                onChange={this.handleOnChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-col">
              <label htmlFor="alive">Alive?: </label>
              <label htmlFor="radio1">
                <input
                  id="radio1"
                  type="radio"
                  name="alive"
                  //   className="form-control"
                  value="t"
                  checked={
                    this.state.alive === "t" || this.state.alive === true
                  }
                  onChange={this.handleOnChange}
                />
                True
              </label>
              <label htmlFor="radio2">
                <input
                  id="radio2"
                  type="radio"
                  name="alive"
                  //   className="form-control"
                  value="f"
                  checked={
                    this.state.alive === "f" || this.state.alive === false
                  }
                  onChange={this.handleOnChange}
                />
                False
              </label>
            </div>
          </div>
          <div>
            <input
              type="submit"
              className={this.state.name ? "submit-btn" : "disabled-btn"}
              value="Update"
              disabled={!this.state.name}
            />
            <button
              type="button"
              className="clear-btn"
              onClick={this.clearForm}
            >
              Clear Form
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={this.cancelFormAction}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    ) : (
      <Spinner isLoading={this.props.isLoading} />
    );
  }
}

const mapStateToProps = (state) => ({
  languageToUpdate: state.languages.languageToUpdate,
  alphabetNames: state.languages.alphabetNames,
  macrofamilyNames: state.languages.macrofamilyNames,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { editLanguage, getAllAlphabets, getAllMacrofamilyNames, isLoading },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LanguageForm)
);
