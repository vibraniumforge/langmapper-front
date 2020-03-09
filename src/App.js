import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import SearchTranslations from "./containers/SearchTranslations.js";
import SearchGenders from "./containers/SearchGenders.js";
import SearchEtymologies from "./containers/SearchEtymologies.js";
import GroupEtymologies from "./containers/GroupEtymologies.js";
import SearchTranslationsByMacrofamily from "./containers/SearchTranslationsByMacrofamily.js";
import SearchTranslationsByLanguage from "./containers/SearchTranslationsByLanguage.js";
import WordForm from "./containers/WordForm.js";
import ViewAllWords from "./containers/ViewAllWords.js";
import LanguageForm from "./containers/LanguageForm.js";
import ViewAllLanguages from "./containers/ViewAllLanguages.js";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Switch id="routes">
            <Route exact path="/" component={Home} />
            <Route path="/search_translations" component={SearchTranslations} />
            <Route path="/search_genders" component={SearchGenders} />
            <Route path="/search_etymologies" component={SearchEtymologies} />
            <Route path="/grouped_etymologies" component={GroupEtymologies} />
            <Route
              path="/all_translations_by_macrofamily"
              component={SearchTranslationsByMacrofamily}
            />
            <Route
              path="/all_translations_by_language"
              component={SearchTranslationsByLanguage}
            />
            <Route path="/new_word" component={WordForm} />
            <Route path="/edit_word" component={WordForm} />
            <Route path="/all_words" component={ViewAllWords} />
            <Route path="/new_language" component={LanguageForm} />
            <Route path="/edit_language" component={LanguageForm} />
            <Route path="/all_languages" component={ViewAllLanguages} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
