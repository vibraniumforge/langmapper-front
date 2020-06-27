// const url = "http://localhost:3001/api/v1";
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

// const url =
//   process.env.REACT_APP_ENVIRONMENT === "development"
//     ? "http://localhost:3001/api/v1"
//     : "https://secure-refuge-32252.herokuapp.com/api/v1";

export const getTranslations = () => {
  return (dispatch) => {
    fetch(`${url}/translations`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_TRANSLATIONS", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const getTranslationById = (id) => {
  return (dispatch) => {
    fetch(`${url}/translations/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_TRANSLATIONS_BY_ID", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const editTranslation = (id, editedTranslation) => {
  const params = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ translation: editedTranslation }),
  };
  return (dispatch) => {
    fetch(`${url}/translations/${id}`, params)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "EDIT_TRANSLATION", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const deleteTranslation = (id) => {
  const params = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  };
  return (dispatch) => {
    fetch(`${url}/languages/${id}`, params)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "DELETE_TRANSLATION", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearGetTranslationById = () => {
  return {
    type: "CLEAR_GET_TRANSLATION_BY_ID",
  };
};

export const searchTranslationsByLanguage = (language) => {
  return (dispatch) => {
    fetch(`${url}/search/all_translations_by_language//${language}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_TRANSLATIONS_BY_LANGUAGE", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};
