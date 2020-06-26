// const url = "http://localhost:3001/api/v1";
const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

// const url =
//   process.env.REACT_APP_ENVIRONMENT === "development"
//     ? "http://localhost:3001/api/v1"
//     : "https://secure-refuge-32252.herokuapp.com/api/v1";

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

export const editLanguage = (id, editedLanguage) => {
  return (dispatch) => {
    const params = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ language: editedLanguage }),
    };
    fetch(`${url}/languages/${id}`, params)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "EDIT_LANGUAGE", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const getAllAlphabets = () => {
  return (dispatch) => {
    fetch(`${url}/search/all_alphabet_names`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_ALL_ALPHABET_NAMES", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const getAllMacrofamilies = () => {
  return (dispatch) => {
    fetch(`${url}/search/all_macrofamily_names`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_ALL_MACROFAMILY_NAMES", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};