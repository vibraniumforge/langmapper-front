import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./index.css";
// import "./css/autofill.css";
import "./css/autofill2.css";
import "./css/buttons.css";
import "./css/cards.css";
import "./css/forms.css";
import "./css/gender.css";
import "./css/home-page.css";
// import "./css/navbar.css";
import "./css/navbar2.css";
import "./css/navbar-admin.css";
import "./css/spinner.css";
import "./css/table.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Older devtools info

// import { createStore, applyMiddleware, compose } from "redux";
// WITH CHROME
// import { createStore, applyMiddleware, compose } from "redux";
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// NOT CHROME
// const store = createStore(rootReducer, applyMiddleware(thunk));
// The Redux dev tools throw an error here.
// If the program does not work comment OUT the above line and comment IN the below line.
// and be sure to comment in the import statement above.

// also remove to work with non-chrome browsers

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
