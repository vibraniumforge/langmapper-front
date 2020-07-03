const initialState = {
  translations: [],
  translationToUpdate: "",
  searchedTranslationsByArea: [],
  searchedTranslationsByLanguage: [],
  searchedTranslationsByWord: [],
  searchedTranslationsByWordGender: [],
  searchedTranslationsByEtymology: [],
  searchWord: "",
  searchArea: "",
  translationMapByArea: "",
};

export default function translationReducer(state = initialState, action) {
  if (process.env.REACT_APP_NODE_ENV === "development") {
    console.log(action);
  }

  switch (action.type) {
    case "GET_TRANSLATIONS":
      return {
        ...state,
        translations: action.payload,
      };

    case "CLEAR_GET_TRANSLATIONS":
      return {
        ...state,
        translations: [],
      };

    case "GET_TRANSLATIONS_BY_ID":
      return {
        ...state,
        translationToUpdate: action.payload,
      };
    case "CLEAR_GET_TRANSLATION_BY_ID":
      return {
        ...state,
        translationToUpdate: "",
      };
    //   no POST/CREATE
    case "EDIT_TRANSLATION":
      const updatedTranslation = {
        id: action.payload.id,
        word_id: action.payload.word_id,
        language_id: action.payload.language_id,
        etymology: action.payload.etymology,
        gender: action.payload.gender,
        link: action.payload.link,
        romanization: action.payload.romanization,
        translation: action.payload.translation,
      };
      return {
        ...state,
        translations: state.translations.map((translation) => {
          return translation.t_id === action.payload.id
            ? (translation = updatedTranslation)
            : translation;
        }),
        // searchedTranslationsByArea: state.searchedTranslationsByArea.map(
        //   (translation) => {
        //     return translation.t_id === action.payload.id
        //       ? (translation = updatedTranslation)
        //       : translation;
        //   }
        // ),
        searchedTranslationsByLanguage: state.searchedTranslationsByLanguage.map(
          (translation) => {
            return translation.t_id === action.payload.id
              ? (translation = updatedTranslation)
              : translation;
          }
        ),
        searchedTranslationsByWord: state.searchedTranslationsByWord.map(
          (translation) => {
            return translation.t_id === action.payload.id
              ? (translation = updatedTranslation)
              : translation;
          }
        ),
      };
    case "DELETE_TRANSLATION":
      const newTranslations = state.translations.filter(
        (translation) => translation.id !== action.payload.id
      );
      return {
        ...state,
        translations: newTranslations,
      };

    case "GET_TRANSLATIONS_BY_LANGUAGE":
      return {
        ...state,
        searchedTranslationsByLanguage: action.payload,
      };
    case "CLEAR_GET_TRANSLATIONS_BY_LANGUAGE":
      return {
        ...state,
        searchedTranslationsByLanguage: [],
      };
    case "GET_TRANSLATIONS_BY_AREA":
      return {
        ...state,
        searchedTranslationsByArea: action.payload,
      };

    case "CLEAR_GET_TRANSLATIONS_BY_AREA":
      return {
        ...state,
        searchedTranslationsByArea: [],
      };
    case "GET_TRANSLATIONS_BY_WORD":
      return {
        ...state,
        searchedTranslationsByWord: action.payload,
      };

    case "CLEAR_GET_TRANSLATIONS_BY_WORD":
      return {
        ...state,
        searchedTranslationsByWord: [],
      };

    case "GET_SEARCH_AREA":
      return {
        ...state,
        searchArea: action.payload,
      };

    case "CLEAR_SEARCH_AREA":
      return {
        ...state,
        searchArea: [],
      };

    case "GET_SEARCH_WORD":
      return {
        ...state,
        searchWord: action.payload,
      };

    case "CLEAR_SEARCH_WORD":
      return {
        ...state,
        searchWord: [],
      };
    case "GET_TRANSLATIONS_BY_WORD_GENDER":
      return {
        ...state,
        searchedTranslationsByWordGender: action.payload,
      };
    case "GET_TRANSLATIONS_BY_ETYMOLOGY":
      return {
        ...state,
        searchedTranslationsByEtymology: action.payload,
      };
    case "GET_TRANSLATIONS_COUNT":
      return {
        ...state,
        translationsCount: action.payload,
      };
    case "GET_TRANSLATIONS_BY_AREA_IMG":
      return {
        ...state,
        translationMapByArea: action.payload,
      };

    default:
      return state;
  }
}
