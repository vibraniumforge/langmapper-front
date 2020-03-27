import React from "react";

const url = `http://localhost:3001/api/v1`;

class Home extends React.Component {
  state = {
    languagesCount: null,
    translationsCount: null,
    wordCount: null
  };

  componentDidMount() {
    this.getLanguagesCount();
    this.getTranslationsCount();
    this.getWordCount();
  }

  getLanguagesCount = () => {
    fetch(`${url}/search/language_count`)
      .then(res => res.json())
      .then(res => {
        this.setState({ languagesCount: res.data });
      })
      .catch(err => console.log(err));
  };

  getTranslationsCount = () => {
    fetch(`${url}/search/translation_count`)
      .then(res => res.json())
      .then(res => {
        this.setState({ translationsCount: res.data });
      })
      .catch(err => console.log(err));
  };

  getWordCount = () => {
    fetch(`${url}/search/word_count`)
      .then(res => res.json())
      .then(res => {
        this.setState({ wordCount: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <h1>Welcome to LangMapper! The language research tool!</h1>
        <h3>Currently {this.state.languagesCount} Languages</h3>
        <h3>Currently {this.state.translationsCount} Translations</h3>
        <h3>Currently {this.state.wordCount} Words</h3>
      </>
    );
  }
}
export default Home;
