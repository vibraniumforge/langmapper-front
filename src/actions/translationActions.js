const url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001/api/v1"
    : "https://secure-refuge-32252.herokuapp.com/api/v1";

// export const getTranslations = () => {
//   return (dispatch) => {
//     fetch(`${url}/translations`)
//       .then((res) => res.json())
//       .then((res) => dispatch({ type: "GET_TRANSLATIONS", payload: res }))
//       .catch((err) => console.log(err));
//   };
// };

if (process.env.REACT_APP_NODE_ENV === "development") {
  console.log(process.env);
  console.log(url);
}

export const getTranslationById = (id) => {
  return (dispatch) => {
    fetch(`${url}/translations/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_TRANSLATIONS_BY_ID", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const clearGetTranslationById = () => {
  return {
    type: "CLEAR_GET_TRANSLATION_BY_ID",
  };
};

export const editTranslation = (id, editedTranslation) => {
  console.log("fires", editedTranslation);
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
    fetch(`${url}/translations/${id}`, params)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "DELETE_TRANSLATION", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

// ++++++++++++++++++++++++++++++++++++++

export const searchTranslationsByLanguage = (language) => {
  return (dispatch) => {
    fetch(`${url}/search/translations/translations_by_language/${language}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_TRANSLATIONS_BY_LANGUAGE", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByLanguage = () => {
  return {
    type: "CLEAR_GET_TRANSLATIONS_BY_LANGUAGE",
  };
};

export const searchTranslationsByArea = (area, word) => {
  return (dispatch) => {
    fetch(`${url}/search/all_translations_by_area/${area}/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_TRANSLATIONS_BY_AREA", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByArea = () => {
  return {
    type: "CLEAR_GET_TRANSLATIONS_BY_AREA",
  };
};

export const searchTranslationsByWord = (word) => {
  return (dispatch) => {
    fetch(`${url}/search/translations/word/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_TRANSLATIONS_BY_WORD", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByWord = () => {
  return {
    type: "CLEAR_GET_TRANSLATIONS_BY_WORD",
  };
};

export const getSearchArea = (area) => {
  return {
    type: "GET_SEARCH_AREA",
    payload: area,
  };
};

export const clearSearchArea = () => {
  return {
    type: "CLEAR_SEARCH_AREA",
  };
};

export const getSearchWord = (word) => {
  return {
    type: "GET_SEARCH_WORD",
    payload: word,
  };
};

export const clearSearchWord = () => {
  return {
    type: "CLEAR_SEARCH_WORD",
  };
};

export const searchTranslationsByWordGender = (word) => {
  return (dispatch) => {
    fetch(`${url}/search/translations/gender/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_TRANSLATIONS_BY_WORD_GENDER", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const searchTranslationsByEtymology = (etymology_string) => {
  return (dispatch) => {
    fetch(`${url}/search/translations/etymology/${etymology_string}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "GET_TRANSLATIONS_BY_ETYMOLOGY", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const getTranslationsCount = () => {
  return (dispatch) => {
    fetch(`${url}/get/translations/translations_count`)
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

export const searchTranslationsByAreaImg = (area, word) => {
  return (dispatch) => {
    let outside;
    fetch(`${url}/search/all_translations_by_area_img/${area}/${word}`)
      .then((res) => res.blob())
      .then((images) => {
        outside = URL.createObjectURL(images);
        return outside;
      })
      .then((outside) =>
        dispatch({ type: "GET_TRANSLATIONS_BY_AREA_IMG", payload: outside })
      )
      .catch((err) => console.log(err));
  };
};
