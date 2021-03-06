const initialState = {
  words: [],
  wordToUpdate: "",
  wordNames: [],
  wordsCount: 0,
  wordDefinition: "",
  searchedWord: "",
};

export default function wordReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_WORDS":
      return {
        ...state,
        words: action.payload,
      };
    case "GET_WORD_BY_ID":
      return {
        ...state,
        wordToUpdate: action.payload,
      };
    case "CREATE_WORD":
      return { words: [...state.words, action.payload] };
    case "EDIT_WORD":
      const editedWord = {
        id: action.payload.id,
        word_name: action.payload.word_name,
        definition: action.payload.definition,
      };
      return {
        ...state,
        words: state.words.map((word) => {
          return word.id === action.payload.id ? (word = editedWord) : word;
        }),
        wordToUpdate: "",
      };
    case "DELETE_WORD":
      const newWords = state.words.filter((word) => {
        return word.id !== action.payload.id;
      });
      return {
        ...state,
        words: newWords,
      };

    //   ====================================================

    case "GET_WORD_NAMES":
      return {
        ...state,
        wordNames: action.payload,
      };
    case "GET_WORDS_COUNT":
      return {
        ...state,
        wordsCount: action.payload,
      };
    case "GET_WORD_DEFINITION":
      return {
        ...state,
        wordDefinition: action.payload,
      };

    case "CLEAR_GET_WORD_BY_ID":
      return {
        ...state,
        wordToUpdate: "",
      };
    case "CLEAR_GET_WORD_DEFINITION":
      return {
        ...state,
        wordDefinition: "",
      };
    case "CLEAR_GET_WORDS":
      return {
        ...state,
        words: [],
      };

    case "GET_SEARCH_WORD":
      return {
        ...state,
        searchedWord: action.payload,
      };
    case "CLEAR_GET_SEARCH_WORD":
      return {
        ...state,
        searchedWord: "",
      };
    default:
      return state;
  }
}
