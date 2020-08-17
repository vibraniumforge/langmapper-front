import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

import AdminNavbar from "./components/AdminNavbar.js";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import Admin from "./components/Admin.js";
import NewWordForm from "./forms/NewWordForm.js";
import EditWordForm from "./forms/EditWordForm.js";
import EditLanguageForm from "./forms/EditLanguageForm.js";
import EditTranslationForm from "./forms/EditTranslationForm.js";
import SearchTranslationsByWord from "./containers/SearchTranslationsByWord.js";
import SearchAllGenders from "./containers/SearchAllGenders.js";
import SearchEtymologiesContent from "./containers/SearchEtymologiesContent.js";
import SearchTranslationsByMacrofamily from "./containers/SearchTranslationsByMacrofamily.js";
import SearchTranslationsByLanguage from "./containers/SearchTranslationsByLanguage.js";
import SearchTranslationsByArea from "./containers/SearchTranslationsByArea.js";
import SearchLanguagesByArea from "./containers/SearchLanguagesByArea.js";
import ViewAllWords from "./containers/ViewAllWords.js";
import ViewAllLanguages from "./containers/ViewAllLanguages.js";
import CreateTranslationMap from "./containers/CreateTranslationMap.js";
import CreateEtymologyMap from "./containers/CreateEtymologyMap.js";
import CreateGenderMap from "./containers/CreateGenderMap.js";

const App = (props) => {
  return (
    <div className="App">
      <Router>
        <div className="router">
          {props.loggedIn ? <AdminNavbar /> : <Navbar />}
          {/* <Navbar /> */}

          <Switch id="routes">
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route
              path="/search_all_translations_by_word"
              component={SearchTranslationsByWord}
            />
            <Route path="/search_genders" component={SearchAllGenders} />
            <Route
              path="/search_etymologies"
              component={SearchEtymologiesContent}
            />
            <Route
              path="/all_translations_by_macrofamily"
              component={SearchTranslationsByMacrofamily}
            />
            <Route
              path="/search_all_translations_by_language"
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
            <Route path="/new_word" component={NewWordForm} />
            <Route path="/edit_word" component={EditWordForm} />
            <Route path="/all_words" component={ViewAllWords} />
            <Route path="/edit_language" component={EditLanguageForm} />
            {/* <Route
              path="/edit_translation"
              render={(props = <EditLanguageForm {...props} />)}
            /> */}
            {/* change the above */}
            <Route path="/all_languages" component={ViewAllLanguages} />
            <Route path="/edit_translation" component={EditTranslationForm} />
            <Route
              path="/create_translation_map"
              component={CreateTranslationMap}
            />
            <Route
              path="/create_etymology_map"
              component={CreateEtymologyMap}
            />
            <Route path="/create_gender_map" component={CreateGenderMap} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

export default connect(mapStateToProps, null)(App);
