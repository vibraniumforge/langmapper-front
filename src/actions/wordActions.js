const url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001/api/v1"
    : "https://secure-refuge-32252.herokuapp.com/api/v1";

const token = () => localStorage.getItem("jwt");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token()}`,
  };
};

export const getWords = () => {
  return (dispatch) => {
    fetch(`${url}/words`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_WORDS", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const getWordById = (id) => {
  const params = {
    method: "GET",
    headers: headers(),
  };
  return (dispatch) => {
    fetch(`${url}/words/${id}`, params)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_WORD_BY_ID", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const createWord = (word) => {
  const newWord = {
    word_name: word,
  };
  const data = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ word: newWord }),
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
    headers: headers(),
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
    headers: headers(),
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
    fetch(`${url}/words/get/word_names`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_WORD_NAMES", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const getWordsCount = () => {
  return (dispatch) => {
    fetch(`${url}/words/get/words_count`)
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
    fetch(`${url}/words/search/definition/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_WORD_DEFINITION", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearGetWords = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_GET_WORDS" });
  };
};

export const clearGetWordById = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_GET_WORD_BY_ID" });
  };
};

export const clearGetWordDefinition = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_GET_WORD_DEFINITION" });
  };
};
