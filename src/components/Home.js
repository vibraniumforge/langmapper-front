import React from "react";

import Spinner from "./Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getLanguagesCount } from "../actions/languageActions";
import { getTranslationsCount, isLoading } from "../actions/translationActions";
import { getWordsCount } from "../actions/wordActions";

class Home extends React.Component {
  componentDidMount() {
    Promise.all([
      this.props.getWordsCount(),
      this.props.getTranslationsCount(),
      this.props.getLanguagesCount(),
    ]);
  }

  render() {
    return this.props.languagesCount > 0 ? (
      <>
        <div id="landing-page">
          <div id="intro-text-div">
            <h1>Welcome to LangMapper! </h1>
            <h1>The language research tool!</h1>
            <h3>Currently {this.props.wordsCount} words</h3>
            <h3>in {this.props.languagesCount} languages</h3>
            <h3>with {this.props.translationsCount} translations!</h3>
          </div>
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
              masculine, red is feminine. Gray is either neuter or common. White
              is not present, like in English.
            </li>
            <li>
              <strong>Search Translation by content of Etymology</strong> -
              Every translation has an etymology section. This feature allows
              you to search by the content of a word's etymology. For example,
              you could search "Ancient Greek" to see words with etymologies
              that come from Ancient Greek.
            </li>
            <li>
              <strong>Search all Translations by Language</strong> - This shows
              the all the translations in a certain langauge. For example,
              entering "French" will show all the translations in French.
            </li>
            <li>
              <strong>Search Translations by Area</strong> - This shows the all
              the translations of a word in a specified geographic area. For
              example, entering "Italy" and "apple" will return all the various
              translations of "apple" in Italy.
            </li>
            <li>
              <strong>Search Languages by Area</strong> - This shows the all of
              the languages in a certain geographic area.
            </li>
            <li>
              <strong>View All Words</strong> - Displays all the words and their
              definitions.
            </li>
            <li>
              <strong>View all Languages</strong> - Displays all the languages
              and relevant info about them.
            </li>
            <li>
              <strong>Create Translation Map by Area</strong> - Show a map of an
              area with all of the translations of a chosen word. For example,
              "Europe" and "bear" makes a map of all the translations of bear in
              Europe!
            </li>
            <li>
              <strong>Create Gender Map by Area</strong> - This creates a map
              highlighting the grammatical gender of a word. The map colors
              correspond to the gender of that word. Note that some languages do
              not have grammatical gender!
            </li>
            <li>
              <strong>Create Etymology Map by Area </strong> - Show a map of an
              area with all of the translations of a chosen word, grouped by
              common etymology. For example, "Europe" and "apple" makes a map of
              all the translations by etymology in Europe! Words with the same
              origin will be colored the same color.
            </li>
          </ol>
        </div>
      </>
    ) : (
      <Spinner isLoading={this.props.isLoading} />
    );
  }
}

const mapStateToProps = (state) => ({
  wordsCount: state.words.wordsCount,
  languagesCount: state.languages.languagesCount,
  translationsCount: state.translations.translationsCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWordsCount,
      getTranslationsCount,
      getLanguagesCount,
      isLoading,
    },
    dispatch
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
