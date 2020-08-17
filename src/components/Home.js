import React from "react";

import Spinner from "./Spinner.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";

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
            <h1>𓃦AßΠЖ金ოनाសᛗꝽ𐌈h₂Ա𓋹𓅃</h1>
          </div>
        </div>
        <div>
          <h1>Let's go on a tour!</h1>{" "}
          <div className="text-holder">
            <p className="text-desc">
              {" "}
              <NavLink
                activeClassName="selected"
                to="/search_all_translations_by_word"
              >
                Search All Translations of a Word
              </NavLink>{" "}
              - shows the all the translations of a word in various languages.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink
                activeClassName="selected"
                to="/search_all_translations_by_gender"
              >
                Search All Genders of a Word
              </NavLink>{" "}
              - shows all the genders of a word in various languages. Blue is
              masculine, red is feminine. Gray is neuter. Purple is common.
              White is not present, like in English.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink
                activeClassName="selected"
                to="/search_all_translations_by_etymology"
              >
                Search Translation by content of Etymology
              </NavLink>{" "}
              - Every translation has an etymology section. This feature allows
              you to search by the content of a word's etymology. For example,
              you could search "Ancient Greek" to see words with etymologies
              that come from Ancient Greek.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink
                activeClassName="selected"
                to="/search_all_translations_by_language"
              >
                Search All Translations by Language
              </NavLink>{" "}
              - This shows the all the translations in a selected langauge. For
              example, entering "French" will show all the translations in
              French.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink
                activeClassName="selected"
                to="/search_all_translations_by_area"
              >
                Search All Translations by Area
              </NavLink>{" "}
              - This shows the all the translations of a selected word in a
              specified geographic area. For example, entering "Italy" and
              "apple" will return all the various translations of "apple" in
              Italy.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink
                activeClassName="selected"
                to="/search_all_languages_by_area"
              >
                Search All Languages by Area
              </NavLink>{" "}
              - This shows the all of the languages in a certain geographic
              area.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink activeClassName="selected" to="/view_all_words">
                View All Words
              </NavLink>{" "}
              - Displays all the words and their definitions.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink activeClassName="selected" to="/view_all_languages">
                View All Languages
              </NavLink>{" "}
              - Displays all the languages and relevant info about them.
            </p>
            <p className="text-desc">
              {" "}
              <NavLink activeClassName="selected" to="/create_translation_map">
                Create Translation Map by Area
              </NavLink>{" "}
              - Show a map of an area with all of the translations of a chosen
              word. For example, "Europe" and "bear" makes a map of all the
              translations of bear in Europe!
            </p>
            <p className="text-desc">
              {" "}
              <NavLink activeClassName="selected" to="/create_gender_map">
                Create Gender Map by Area
              </NavLink>{" "}
              - This creates a map highlighting the grammatical gender of a
              word. The map colors correspond to the gender of that word. Note
              that some languages do not have grammatical gender!
            </p>

            <p className="text-desc">
              {" "}
              <NavLink activeClassName="selected" to="/create_etymology_map">
                Create Etymology Map by Area
              </NavLink>{" "}
              - Show a map of an area with all of the translations of a chosen
              word, grouped by common etymology. For example, "Europe" and
              "apple" makes a map of all the translations by etymology in
              Europe! Words with the same origin will be colored the same color.
            </p>
          </div>
        </div>
        <div>
          <h1>Have Fun!!!</h1>
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
