import { combineReducers } from "redux";
import languageReducer from "./languageReducer.js";
import wordReducer from "./wordReducer.js";
import translationReducer from "./translationReducer.js";

const rootReducer = combineReducers({
  languages: languageReducer,
  words: wordReducer,
  translations: translationReducer,
});

export default rootReducer;
