const initialState = {
  translations: [],
  translationToUpdate: "",
};

export default function translationReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "GET_TRANSLATIONS":
      return {
        ...state,
        translations: action.payload,
      };
    case "GET_TRANSLATIONS_BY_LANGUAGE":
      return {
        ...state,
        translations: action.payload,
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
          return translation.id === action.payload.id
            ? (translation = updatedTranslation)
            : translation;
        }),
      };
    case "DELETE_TRANSLATION":
      const newTranslations = state.translations.filter(
        (translation) => translation.id !== action.payload.id
      );
      return {
        ...state,
        translations: newTranslations,
      };
    default:
      return state;
  }
}
