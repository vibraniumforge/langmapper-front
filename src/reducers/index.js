import { combineReducers } from "redux";
import languageReducer from "./languageReducer.js";
import wordReducer from "./wordReducer.js";
import translationReducer from "./translationReducer.js";
import userReducer from "./userReducer.js";

const rootReducer = combineReducers({
  languages: languageReducer,
  words: wordReducer,
  translations: translationReducer,
  users: userReducer,
});

export default rootReducer;
