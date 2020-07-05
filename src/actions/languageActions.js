// const url = "http://localhost:3001/api/v1";
// const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

const url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001/api/v1"
    : "https://secure-refuge-32252.herokuapp.com/api/v1";

export const getLanguages = () => {
  return (dispatch) => {
    fetch(`${url}/languages`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_LANGUAGES", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const getLanguageById = (id) => {
  return (dispatch) => {
    fetch(`${url}/languages/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_LANGUAGE_BY_ID", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const editLanguage = (id, editedLanguage) => {
  const params = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ language: editedLanguage }),
  };
  return (dispatch) => {
    fetch(`${url}/languages/${id}`, params)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "EDIT_LANGUAGE", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const deleteLanguage = (id) => {
  return (dispatch) => {
    const params = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    };
    fetch(`${url}/languages/${id}`, params)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "DELETE_LANGUAGE", payload: res.data }))
      .catch((err) => console.log(err));
  };
};
// ===============================

export const getAllAlphabets = () => {
  return (dispatch) => {
    fetch(`${url}/get/languages/alphabet_names`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_ALL_LANGUAGE_ALPHABET_NAMES", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const getAllMacrofamilies = () => {
  return (dispatch) => {
    fetch(`${url}/get/languages/macrofamily_names`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "GET_ALL_LANGUAGE_MACROFAMILY_NAMES",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const getAllLanguageAreaNames = () => {
  return (dispatch) => {
    fetch(`${url}/get/languages/area_names`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "GET_ALL_LANGUAGE_AREA_NAMES",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const getLanguagesByArea = (area) => {
  return (dispatch) => {
    fetch(`${url}/search/languages/area/${area}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "GET_LANGUAGES_BY_AREA",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const clearGetLanguagesByArea = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_GET_LANGUAGES_BY_AREA" });
  };
};

export const getLanguagesCount = () => {
  return (dispatch) => {
    fetch(`${url}/get/languages/languages_count`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "GET_LANGUAGES_COUNT",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};
