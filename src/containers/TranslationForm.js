import React, { Component } from "react";

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = 'http://localhost:3001/api/v1'
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class TranslationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      word: "",
      etymology: "",
      gender: "",
      link: "",
      romanization: "",
      translation: "",
      alphabets: [],
      macrofamilies: [],
      editMode: null,
    };
  }

  componentDidMount() {
    this.getTranslationById();
  }

  getTranslationById = () => {
    const splitLang = this.props.location.pathname.split("/");
    const translationId = splitLang[splitLang.length - 1];
    return fetch(`${url}/translations/${translationId}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          language: res.language.name,
          word: res.word.word_name,
          etymology: res.etymology,
          gender: res.gender,
          link: res.link,
          romanization: res.romanization,
          translation: res.translation,
        });
      })
      .catch((err) => console.log(err));
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnPatch = (e) => {
    e.preventDefault();
    const splitLang = this.props.location.pathname.split("/");
    const translationId = splitLang[splitLang.length - 1];
    fetch(`${url}/translations/${translationId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        translation: {
          language: this.state.language,
          word: this.state.word,
          etymology: this.state.etymology,
          gender: this.state.gender,
          link: this.state.link,
        },
      }),
    })
      .then((res) => res.json())
      .then(this.clearForm())
      //   .then(this.props.history.push("/all_translations_by_language"))
      .then(this.props.history.goBack())
      .catch((err) => console.log(err));
  };

  cancelFormAction = () => {
    // this.props.history.push("/all_translations_by_language");
    this.props.history.goBack();
  };

  clearForm = () => {
    this.setState({
      language: "",
      word: "",
      etymology: "",
      gender: "",
      link: "",
      romanization: "",
      translation: "",
    });
  };

  render() {
    return (
      <>
        <form id="new-lang-form" onSubmit={(e) => this.handleOnPatch(e)}>
          <h3>Edit a Translation</h3>
          <div>
            <label htmlFor="name">Language: </label>
            <input
              type="text"
              id="language"
              name="language"
              placeholder="Language Name"
              value={this.state.language}
              onChange={this.handleOnChange}
              disabled
            />
            <label htmlFor="word">Word: </label>
            <input
              type="text"
              id="word"
              name="word"
              placeholder="Word"
              value={this.state.word}
              onChange={this.handleOnChange}
              disabled
            />
          </div>
          <div>
            <label htmlFor="translation">Translation: </label>
            <input
              type="text"
              id="translation"
              name="translation"
              placeholder="Translation"
              value={this.state.translation}
              onChange={this.handleOnChange}
            />
            <label htmlFor="romanization">Romanization: </label>
            <input
              type="text"
              id="romanization"
              name="romanization"
              placeholder="Romanization"
              value={this.state.romanization}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="link">Link: </label>
            <input
              type="text"
              id="link"
              name="link"
              placeholder="Link"
              value={this.state.link}
              onChange={this.handleOnChange}
            />

            <label htmlFor="gender">Gender: </label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="Gender"
              value={this.state.gender || "None Found"}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="etymology">Etymology: </label>
            <textarea
              id="etymology"
              name="etymology"
              placeholder="Etymology"
              value={this.state.etymology || "None Found"}
              onChange={this.handleOnChange}
            />
          </div>
          <input type="submit" value="Update" className="submit-btn" />

          <button
            type="button"
            className="cancel-btn"
            onClick={this.cancelFormAction}
          >
            Cancel
          </button>
          <button type="button" className="clear-btn" onClick={this.clearForm}>
            Clear Form
          </button>
        </form>
      </>
    );
  }
}

export default TranslationForm;
