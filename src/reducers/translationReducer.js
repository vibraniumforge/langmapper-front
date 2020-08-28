const initialState = {
  translations: [],
  translationToUpdate: "",
  searchedTranslationsByArea: [],
  searchedTranslationsByLanguage: [],
  searchedTranslationsByWord: [],
  searchedTranslationsByWordGender: [],
  searchedTranslationsByEtymology: [],
  searchedTranslationsByMacrofamily: [],
  //   searchWord: "",
  //   searchArea: "",
  translationMapByArea: "",
  translationMapByEtymology: "",
  translationMapByGender: "",
  isLoading: false,
};

export default function translationReducer(state = initialState, action) {
  if (process.env.REACT_APP_NODE_ENV === "development") {
    console.log(action);
  }

  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "IS_NOT_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_TRANSLATIONS":
      return {
        ...state,
        translations: action.payload,
        isLoading: false,
      };
    case "GET_TRANSLATION_BY_ID":
      return {
        ...state,
        translationToUpdate: action.payload,
        isLoading: false,
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
        isLoading: false,
      };
    case "DELETE_TRANSLATION":
      const newTranslations = state.translations.filter(
        (translation) => translation.id !== action.payload.id
      );
      return {
        ...state,
        translations: newTranslations,
      };

    //   =======================================

    case "SEARCH_TRANSLATIONS_BY_LANGUAGE":
      return {
        ...state,
        searchedTranslationsByLanguage: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_LANGUAGE":
      return {
        ...state,
        searchedTranslationsByLanguage: [],
        isLoading: false,
      };

    case "SEARCH_TRANSLATIONS_BY_AREA":
      return {
        ...state,
        searchedTranslationsByArea: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_AREA":
      return {
        ...state,
        searchedTranslationsByArea: [],
        isLoading: false,
      };

    case "SEARCH_TRANSLATIONS_BY_WORD":
      return {
        ...state,
        searchedTranslationsByWord: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_WORD":
      return {
        ...state,
        searchedTranslationsByWord: [],
        isLoading: false,
      };

    // case "GET_SEARCH_AREA":
    //   return {
    //     ...state,
    //     searchArea: action.payload,
    //   };
    // case "CLEAR_GET_SEARCH_AREA":
    //   return {
    //     ...state,
    //     searchArea: [],
    //   };

    case "SEARCH_TRANSLATIONS_BY_WORD_GENDER":
      return {
        ...state,
        searchedTranslationsByWordGender: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_WORD_GENDER":
      return {
        ...state,
        searchedTranslationsByWordGender: [],
        isLoading: false,
      };

    case "SEARCH_TRANSLATIONS_BY_ETYMOLOGY":
      return {
        ...state,
        isLoading: false,
        searchedTranslationsByEtymology: action.payload,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_ETYMOLOGY":
      return {
        ...state,
        searchedTranslationsByEtymology: [],
      };

    case "SEARCH_TRANSLATIONS_BY_MACROFAMILY":
      return {
        ...state,
        searchedTranslationsByMacrofamily: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_MACROFAMILY":
      return {
        ...state,
        searchedTranslationsByMacrofamily: [],
        isLoading: false,
      };

    case "SEARCH_TRANSLATIONS_BY_AREA_IMG":
      return {
        ...state,
        translationMapByArea: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_IMG":
      return {
        ...state,
        translationMapByArea: [],
        isLoading: false,
      };

    case "SEARCH_TRANSLATIONS_BY_AREA_GENDER_IMG":
      return {
        ...state,
        translationMapByGender: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_GENDER_IMG":
      return {
        ...state,
        translationMapByGender: [],
        isLoading: false,
      };

    case "SEARCH_TRANSLATIONS_BY_AREA_ETYMOLOGY_IMG":
      return {
        ...state,
        translationMapByEtymology: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_ETYMOLOGY_IMG":
      return {
        ...state,
        translationMapByEtymology: [],
        isLoading: false,
      };

    case "GET_TRANSLATIONS_COUNT":
      return {
        ...state,
        translationsCount: action.payload,
      };

    case "SEARCH_TRANSLATIONS_BY_AREA_EUROPE_MAP":
      return {
        ...state,
        searchedTranslationsByArea: action.payload,
        isLoading: false,
      };
    case "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_EUROPE_MAP":
      return {
        ...state,
        searchedTranslationsByArea: [],
        isLoading: false,
      };

    default:
      return state;
  }
}
