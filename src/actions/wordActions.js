const url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001/api/v1"
    : "https://secure-refuge-32252.herokuapp.com/api/v1";

export const getWords = () => {
  return (dispatch) => {
    fetch(`${url}/words`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_WORDS", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const getWordById = (id) => {
  return (dispatch) => {
    fetch(`${url}/words/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_WORD_BY_ID", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const createWord = (word) => {
  const data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word_name: word }),
  };
  return (dispatch) => {
    fetch(`${url}/words`, data)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "CREATE_WORD", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const editWord = (id, editedWord) => {
  const data = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: editedWord }),
  };
  return (dispatch) => {
    fetch(`${url}/words/${id}`, data)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "EDIT_WORD", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const deleteWord = (id) => {
  const data = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return (dispatch) => {
    fetch(`${url}/words/${id}`, data)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "DELETE_WORD", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const getWordNames = () => {
  return (dispatch) => {
    fetch(`${url}/get/words/word_names`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_WORD_NAMES", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const getWordsCount = () => {
  return (dispatch) => {
    fetch(`${url}/get/words/words_count`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "GET_WORDS_COUNT",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const getWordDefinition = (word) => {
  return (dispatch) => {
    fetch(`${url}/search/words/definition/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_WORD_DEFINITION", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearGetWordById = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_GET_WORD_BY_ID" });
  };
};
