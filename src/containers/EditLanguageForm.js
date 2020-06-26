import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  editLanguage,
  getAllAlphabets,
  getAllMacrofamilies,
} from "../actions/languageActions.js";

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = "http://localhost:3001/api/v1";
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

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
      editMode: null,
    };
  }

  componentDidMount() {
    // this.props.getAllAlphabets();
    // this.props.getAllMacrofamilies();
    this.setEditMode();
    // this.getLanguageById();
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    console.log(this.props.languageToUpdate);
    console.log(this.props.alphabetNames);
    console.log(this.props.macrofamilyNames);

    if (
      //   this.props.languageToUpdate.id !== "" &&
      //   this.props.alphabetNames.length > 0 &&
      //   this.props.macrofamilyNames.length > 0
      this.props.languageToUpdate["id"] &&
      this.props.languageToUpdate !== prevProps.languageToUpdate

      //   this.props.alphabetNames &&
      //   this.props.alphabetNames !== prevProps.alphabetNames &&
      //   this.props.macrofamilyNames &&
      //   this.props.macrofamilyNames !== prevProps.macrofamilyNames
    ) {
      //   this.props.getAllAlphabets();
      //   this.props.getAllMacrofamilies();
      this.setState(
        {
          name: this.props.languageToUpdate.name,
          abbreviation: this.props.languageToUpdate.abbreviation,
          alphabet: this.props.languageToUpdate.alphabet,
          macrofamily: this.props.languageToUpdate.macrofamily,
          family: this.props.languageToUpdate.family,
          subfamily: this.props.languageToUpdate.subfamily,
          area1: this.props.languageToUpdate.area1,
          area2: this.props.languageToUpdate.area2,
          area3: this.props.languageToUpdate.area3,
          notes: this.props.languageToUpdate.notes,
          alive: this.props.languageToUpdate.alive,
          //   alphabetNames: [...prevState.alphabetNames, this.props.alphabetNames],
          //   macrofamilyNames: [
          //     ...prevState.macrofamilyNames,
          //     this.props.macrofamilyNames,
          //   ],
          alphabetNames: this.props.alphabetNames,
          macrofamilyNames: this.props.macrofamilyNames,
        },
        () => console.log(this.state)
      );
    }
  }

  setEditMode = () => {
    if (this.props.location.pathname === "/new_language") {
      this.setState({ editMode: false });
    } else {
      this.setState({ editMode: true });
    }
  };

  //   getAllMacrofamilies = () => {
  //     fetch(`${url}/search/all_macrofamily_names`)
  //       .then((res) => res.json())
  //       .then((res) =>
  //         this.setState({
  //           macrofamilies: res.data,
  //         })
  //       )
  //       .catch((err) => console.log(err));
  //   };

  //   getAllAlphabets = () => {
  //     fetch(`${url}/search/all_alphabet_names`)
  //       .then((res) => res.json())
  //       .then((res) =>
  //         this.setState({
  //           alphabets: res.data,
  //         })
  //       )
  //       .catch((err) => console.log(err));
  //   };

  getLanguageById = () => {
    if (this.props.location.pathname === "/new_language") {
      return;
    }
    const splitLang = this.props.location.pathname.split("/");
    const languageId = splitLang[splitLang.length - 1];
    console.log(this.props);
    this.props.getLanguageById(languageId).then((res) => {
      this.setState({
        name: res.name,
        abbreviation: res.abbreviation,
        alphabet: res.alphabet,
        macrofamily: res.macrofamily,
        family: res.family,
        subfamily: res.subfamily,
        area1: res.area1,
        area2: res.area2,
        area3: res.area3,
        notes: res.notes,
        alive: res.alive,
      });
    });
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    fetch(`${url}/languages/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: {
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
          alive: this.state.alive,
        },
      }),
    })
      .then((res) => res.json())
      .then(this.clearForm)
      .then(this.props.history.push("/all_languages"))
      .catch((err) => console.log(err));
  };

  handleOnPatch = (e) => {
    e.preventDefault();
    const splitLang = this.props.location.pathname.split("/");
    const languageId = splitLang[splitLang.length - 1];
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

    // fetch(`${url}/languages/${languageId}`, {
    //   method: "PATCH",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     language: {
    //       name: this.state.name,
    //       abbreviation: this.state.abbreviation,
    //       alphabet: this.state.alphabet,
    //       macrofamily: this.state.macrofamily,
    //       family: this.state.family,
    //       subfamily: this.state.subfamily,
    //       area1: this.state.area1,
    //       area2: this.state.area2,
    //       area3: this.state.area3,
    //       notes: this.state.notes,
    //       alive:
    //         this.state.alive === "t" || this.state.alive === true
    //           ? true
    //           : false,
    //     },
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(this.clearForm())
    //   .then(this.props.history.push("/all_languages"))
    //   .catch((err) => console.log(err));
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
    const macrofamilies =
      this.state.macrofamilyNames && this.state.macrofamilyNames.length > 0
        ? this.state.macrofamilyNames.map((macrofamily, index) => {
            return macrofamily ? (
              <option key={index}>{macrofamily}</option>
            ) : null;
          })
        : null;
    const alphabets =
      this.state.alphabetNames && this.state.alphabetNames.length > 0
        ? this.state.alphabetNames.map((alphabet, index) => {
            return alphabet ? <option key={index}>{alphabet}</option> : null;
          })
        : null;
    return (
      <>
        <form
          id="new-lang-form"
          onSubmit={
            this.state.editMode
              ? (e) => this.handleOnPatch(e)
              : (e) => this.handleOnSubmit(e)
          }
        >
          {this.state.editMode ? (
            <h3>Edit a Language</h3>
          ) : (
            <h3>Create a new Language</h3>
          )}
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Language Name"
              value={this.state.name}
              onChange={this.handleOnChange}
            />
            <label htmlFor="abbreviation">Abbreviation: </label>
            <input
              type="text"
              id="abbreviation"
              name="abbreviation"
              placeholder="Language Abbreviation"
              value={this.state.abbreviation}
              onChange={this.handleOnChange}
            />
            <label htmlFor="alphabet">Alphabet: </label>
            <select
              id="alphabet"
              name="alphabet"
              value={this.state.alphabet}
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
              value={this.state.macrofamily}
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
              value={this.state.family}
              onChange={this.handleOnChange}
            />
            <label htmlFor="subfamily">Subfamily: </label>
            <input
              type="text"
              id="subfamily"
              name="subfamily"
              placeholder="Language Subfamily"
              value={this.state.subfamily}
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
              value={this.state.area1}
              onChange={this.handleOnChange}
            />
            <label htmlFor="area2">Area 2: </label>
            <input
              type="text"
              id="area2"
              name="area2"
              placeholder="Another Area?"
              value={this.state.area2}
              onChange={this.handleOnChange}
            />
            <label htmlFor="area3">Area 3: </label>
            <input
              type="text"
              id="area3"
              name="area3"
              placeholder="Another Area??"
              value={this.state.area3}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes: </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Notes"
              value={this.state.notes}
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
            value={this.state.editMode ? "Update" : "Submit"}
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
    { editLanguage, getAllAlphabets, getAllMacrofamilies },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LanguageForm)
);
