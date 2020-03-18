import React, { Component } from "react";

class LanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "abc",
      abbreviation: "abc",
      alphabet: "Latn",
      macrofamily: "Uralic",
      family: "Finnic",
      subfamily: "Fake here",
      area1: "Europe",
      area2: "North Europe",
      area3: "Finland",
      notes: "Note: this is fake.",
      alive: "t",
      alphabets: [],
      macrofamilies: []
    };
  }

  componentDidMount() {
    this.getAllAlphabets();
    this.getAllMacrofamilies();
  }

  getAllAlphabets = () => {
    fetch(`http://localhost:3001/api/v1/search/all_macrofamily_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          macrofamilies: res.data
        })
      )
      .catch(err => console.log(err));
  };

  getAllMacrofamilies = () => {
    fetch(`http://localhost:3001/api/v1/search/all_alphabet_names`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          alphabets: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      console.log(this.state)
    );
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/languages/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
        alive: this.state.alive
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(this.clearForm)
      .catch(err => console.log(err));
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
      alive: ""
    });
  };

  render() {
    const macrofamilies =
      this.state.macrofamilies && this.state.macrofamilies.length > 0
        ? this.state.macrofamilies.map((macrofamily, index) => {
            return macrofamily ? (
              <option key={index}>{macrofamily}</option>
            ) : null;
          })
        : null;
    const alphabets =
      this.state.alphabets && this.state.alphabets.length > 0
        ? this.state.alphabets.map((alphabet, index) => {
            return alphabet ? <option key={index}>{alphabet}</option> : null;
          })
        : null;
    return (
      <>
        <form id="new-lang-form" onSubmit={e => this.handleOnSubmit(e)}>
          <h3>Create a new Language</h3>
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
                checked={this.state.alive === "t"}
                onChange={this.handleOnChange}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="alive"
                value="f"
                checked={this.state.alive === "f"}
                onChange={this.handleOnChange}
              />
              False
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default LanguageForm;
