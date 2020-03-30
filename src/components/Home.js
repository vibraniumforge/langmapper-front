import React from "react";

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = 'http://localhost:3001/api/v1'
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class Home extends React.Component {
  state = {
    languagesCount: null,
    translationsCount: null,
    wordCount: null,
    complete: false
  };

  componentDidMount() {
    // this.getLanguagesCount();
    // this.getTranslationsCount();
    // this.getWordCount();
    Promise.all([
      fetch(`${url}/search/language_count`),
      fetch(`${url}/search/translation_count`),
      fetch(`${url}/search/word_count`)
    ])
      .then(([res1, res2, res3]) =>
        Promise.all([res1.json(), res2.json(), res3.json()])
      )
      .then(([res1, res2, res3]) => {
        this.setState({
          languagesCount: res1.data,
          translationsCount: res2.data,
          wordCount: res3.data,
          complete: true
        });
      })
      .catch(err => console.log(err));
  }

  //   getLanguagesCount = () => {
  //     fetch(`${url}/search/language_count`)
  //       .then(res => res.json())
  //       .then(res => {
  //         this.setState({ languagesCount: res.data });
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   getTranslationsCount = () => {
  //     fetch(`${url}/search/translation_count`)
  //       .then(res => res.json())
  //       .then(res => {
  //         this.setState({ translationsCount: res.data });
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   getWordCount = () => {
  //     fetch(`${url}/search/word_count`)
  //       .then(res => res.json())
  //       .then(res => {
  //         this.setState({ wordCount: res.data });
  //       })
  //       .catch(err => console.log(err));
  //   };

  render() {
    return this.state.complete ? (
      <div id="landing-page">
        <h1>Welcome to LangMapper! The language research tool!</h1>
        <h3>Currently {this.state.wordCount} words</h3>
        <h3>in {this.state.languagesCount} languages</h3>
        <h3>with {this.state.translationsCount} translations!</h3>
      </div>
    ) : null;
  }
}
export default Home;
