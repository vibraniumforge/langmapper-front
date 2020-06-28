// const url = "http://localhost:3001/api/v1";
// const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

const url =
  process.env.REACT_APP_ENVIRONMENT === "development"
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
      .then((res) => dispatch({ type: "GET_WORD_BY_ID", payload: res }))
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
      .then((res) => dispatch({ type: "CREATE_WORD", payload: res }))
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

export const clearGetWordById = () => {
  return {
    type: "CLEAR_GET_WORD_BY_ID",
  };
};
