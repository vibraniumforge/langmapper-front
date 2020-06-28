const initialState = {
  languages: [],
  languageToUpdate: "",
  alphabetNames: [],
  macrofamilyNames: [],
  languageAreaNames: [],
};

export default function languageReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_LANGUAGES":
      return {
        ...state,
        languages: action.payload,
      };
    case "GET_LANGUAGE_BY_ID":
      return {
        ...state,
        languageToUpdate: action.payload,
      };

    //   no POST/CREATE
    case "EDIT_LANGUAGE":
      const updatedLanguage = {
        id: action.payload.id,
        name: action.payload.name,
        abbreviation: action.payload.abbreviation,
        alphabet: action.payload.alphabet,
        macrofamily: action.payload.macrofamily,
        family: action.payload.family,
        subfamily: action.payload.subfamily,
        area1: action.payload.area1,
        area2: action.payload.area2,
        area3: action.payload.area3,
        alive: action.payload.alive,
        notes: action.payload.notes,
      };
      return {
        ...state,
        languages: state.languages.map((lang) => {
          return lang.id === action.payload.id
            ? (lang = updatedLanguage)
            : lang;
        }),
      };
    case "DELETE_LANGUAGE":
      const newLanguages = state.languages.filter(
        (language) => language.id !== action.payload.id
      );
      return {
        ...state,
        languages: newLanguages,
      };
    case "GET_ALL_LANGUAGE_ALPHABET_NAMES":
      return {
        ...state,
        alphabetNames: action.payload,
      };
    case "GET_ALL_LANGUAGE_MACROFAMILY_NAMES":
      return {
        ...state,
        macrofamilyNames: action.payload,
      };
    case "GET_LANGUAGE_AREA_NAMES": {
      return {
        ...state,
        languageAreaNames: action.payload,
      };
    }
    default:
      return state;
  }
}
