const initialState = {
  wordsCount: 0,
  languagesCount: 0,
  translationsCount: 0,
};

export default function languageReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "GET_WORDS_COUNT":
      return {
        ...state,
        wordsCount: action.payload,
      };
    case "GET_LANGUAGES_COUNT":
      return {
        ...state,
        languagesCount: action.payload,
      };
    case "GET_TRANSLATIONS_COUNT":
      return {
        ...state,
        translationsCount: action.payload,
      };
    default: {
      return state;
    }
  }
}
