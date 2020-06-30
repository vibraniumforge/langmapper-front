// const url = "http://localhost:3001/api/v1";
// const url = "https://secure-refuge-32252.herokuapp.com/api/v1";

const url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001/api/v1"
    : "https://secure-refuge-32252.herokuapp.com/api/v1";

export const getWordsCount = () => {
  return (dispatch) => {
    fetch(`${url}/search/words_count`)
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

export const getTranslationsCount = () => {
  return (dispatch) => {
    fetch(`${url}/search/translations_count`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "GET_TRANSLATIONS_COUNT",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const getLanguagesCount = () => {
  return (dispatch) => {
    fetch(`${url}/search/languages_count`)
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
