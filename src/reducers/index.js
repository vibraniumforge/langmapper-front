import { combineReducers } from "redux";
import languageReducer from "./languageReducer.js";
import countReducer from "./countReducer.js";
import wordReducer from "./wordReducer.js";
import translationsReducer from "./translationsReducer.js";

const rootReducer = combineReducers({
  languages: languageReducer,
  counts: countReducer,
  words: wordReducer,
  translations: translationsReducer,
});

export default rootReducer;
