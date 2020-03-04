import React from "react";
import "./App.css";
import Routes from "./routes.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import SearchTranslations from "./containers/SearchTranslations.js";
import SearchGenders from "./containers/SearchGenders.js";
import SearchEtymologies from "./containers/SearchEtymologies.js";
import GroupEtymologies from "./containers/GroupEtymologies.js";
import EtysByMacrofamily from "./containers/EtysByMacrofamily.js";

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
            <Route path="/all_by_macrofamily" component={EtysByMacrofamily} />
            {/* <Route path="/select_amtrak_station" component={AmtrakStationSelect} />
        <Route path="/view_user_trains" component={ViewUserTrains} />
        <Route path="/new_user_train" component={NewTrainForm} />
        <Route path="/edit_user_train" component={EditTrainForm} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
