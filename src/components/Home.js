import React from "react";

// const REACT_APP_URL = process.env.REACT_APP_URL;
// const url = 'http://localhost:3001/api/v1'
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

class Home extends React.Component {
  state = {
    languagesCount: null,
    translationsCount: null,
    wordCount: null,
    complete: false,
  };

  componentDidMount() {
    // this.getLanguagesCount();
    // this.getTranslationsCount();
    // this.getWordCount();
    Promise.all([
      fetch(`${url}/search/language_count`),
      fetch(`${url}/search/translation_count`),
      fetch(`${url}/search/word_count`),
    ])
      .then(([res1, res2, res3]) =>
        Promise.all([res1.json(), res2.json(), res3.json()])
      )
      .then(([res1, res2, res3]) => {
        this.setState({
          languagesCount: res1.data,
          translationsCount: res2.data,
          wordCount: res3.data,
          complete: true,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return this.state.complete ? (
      <>
        <div id="landing-page">
          <h1>Welcome to LangMapper! The language research tool!</h1>
          <h3>Currently {this.state.wordCount} words</h3>
          <h3>in {this.state.languagesCount} languages</h3>
          <h3>with {this.state.translationsCount} translations!</h3>
        </div>
        <div>
          <h2>How to Use</h2>
          <ol>
            <li>
              <strong>Search All Translations of a Word</strong> - This shows
              the all the translations of a word in the various included
              languages.
            </li>
            <li>
              <strong>Search All Genders of a Word</strong> - This shows the all
              the genders of a word in the various included languages. Blue is
              masculine, red is feminine. Gray is either neuter or not
              applicable, like in English.
            </li>
            <li>
              <strong>Search by content of Etymology</strong> - This allows you
              to search by the content of a word's etymology. For example, you
              could search "Ancient Greek" to see words with etymologies that
              come from Ancient Greek.
            </li>
            <li>
              <strong>Search Etymology Grouped</strong> - This searches by and
              groups words if they have a shared etymology. This is currently in
              Beta
            </li>
            <li>
              <strong>Search all Translations by Language</strong> - This shows
              the all the translations in a certain langauge. For example,
              entering "French" will show all translations in French.
            </li>
            <li>
              <strong>Search Languages by Area</strong> - This shows the all the
              languages in the DB in a certain geographic area.
            </li>
            <li>
              <strong>Search Translations by Area</strong> - This shows the all
              the translations of a word in a specified geographic area. For
              example, entering "Italy" and "apple" will return all the various
              translations of "apple" in Italy.
            </li>
            <li>
              <strong>View All Words</strong> - Displays all the words currently
              in the DB and the definition.
            </li>
            <li>
              <strong>View all Languages</strong> - Displays all the languages
              in the DB and some info about them.
            </li>
            <li>
              <strong>Create Translation Map by Area</strong> - Show a map of an
              area with all of the translations of a chosen word. For example,
              "Europe" and "bear" makes a map of all the translations of bear in
              Europe!
            </li>
            <li>
              <strong>Create Etymology Map by Area (Beta)</strong> - Show a map
              of an area with all of the translations of a chosen word, grouped
              by common etymology. For example, "Europe" and "apple" makes a map
              of all the translations by etymology in Europe! This is still in
              Beta.
            </li>
            <li>
              <strong>Create Gender Map by Area</strong> - This creates a map
              highlighting the grammatical gender of a word. The map colors
              correspond to the gender of that word. Note that some languages do
              not have grammatical gender!
            </li>
          </ol>
        </div>
      </>
    ) : null;
  }
}
export default Home;
