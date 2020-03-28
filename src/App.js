import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import SearchAllTranslations from "./containers/SearchAllTranslations.js";
import SearchAllGenders from "./containers/SearchAllGenders.js";
import SearchEtymologiesContent from "./containers/SearchEtymologiesContent.js";
import SearchEtymologiesGrouped from "./containers/SearchEtymologiesGrouped.js";
import SearchTranslationsByMacrofamily from "./containers/SearchTranslationsByMacrofamily.js";
import SearchTranslationsByLanguage from "./containers/SearchTranslationsByLanguage.js";
import WordForm from "./containers/WordForm.js";
import ViewAllWords from "./containers/ViewAllWords.js";
import LanguageForm from "./containers/LanguageForm.js";
import ViewAllLanguages from "./containers/ViewAllLanguages.js";
import SearchLanguagesByArea from "./containers/SearchLanguagesByArea.js";
import SearchTranslationsByArea from "./containers/SearchTranslationsByArea.js";
import TranslationForm from "./containers/TranslationForm.js";
import CreateEtymologyMap from "./containers/CreateEtymologyMap.js";
// import SearchTranslationsByAreaText from "./containers/SearchTranslationsByAreaText.js";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Switch id="routes">
            <Route exact path="/" component={Home} />
            <Route
              path="/search_translations"
              component={SearchAllTranslations}
            />
            <Route path="/search_genders" component={SearchAllGenders} />
            <Route
              path="/search_etymologies"
              component={SearchEtymologiesContent}
            />
            <Route
              path="/grouped_etymologies"
              component={SearchEtymologiesGrouped}
            />
            <Route
              path="/all_translations_by_macrofamily"
              component={SearchTranslationsByMacrofamily}
            />
            <Route
              path="/all_translations_by_language"
              component={SearchTranslationsByLanguage}
            />
            <Route
              path="/search_languages_by_area"
              component={SearchLanguagesByArea}
            />
            <Route
              path="/search_translations_by_area"
              component={SearchTranslationsByArea}
            />
            <Route path="/new_word" component={WordForm} />
            <Route path="/edit_word" component={WordForm} />
            <Route path="/all_words" component={ViewAllWords} />
            <Route path="/new_language" component={LanguageForm} />
            <Route path="/edit_language" component={LanguageForm} />
            <Route path="/all_languages" component={ViewAllLanguages} />
            <Route path="/edit_translation" component={TranslationForm} />
            <Route
              path="/create_etymology_map"
              component={CreateEtymologyMap}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
