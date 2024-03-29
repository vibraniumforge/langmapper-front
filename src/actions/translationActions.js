const url = process.env.REACT_APP_DEVELOPMENT_URI;

if (process.env.REACT_APP_NODE_ENV === "development") {
  console.log(process.env);
  //   console.log(process.env.DEVELOPMENT_URI);
  //   console.log(process.env.PRODUCTION_URI);
  console.log(`${process.env.REACT_APP_NODE_ENV} - ${url}`);
}

if (process.env.REACT_APP_NODE_ENV === "production") {
  console.log(process.env);
  //   console.log(process.env.DEVELOPMENT_URI);
  //   console.log(process.env.PRODUCTION_URI);
  console.log(`${process.env.REACT_APP_NODE_ENV} - ${url}`);
}

const token = () => localStorage.getItem("jwt");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token()}`,
  };
};

// too many translations to list
// export const getTranslations = () => {
//   return (dispatch) => {
//     fetch(`${url}/translations`)
//       .then((res) => res.json())
//       .then((res) => dispatch({ type: "GET_TRANSLATIONS", payload: res }))
//       .catch((err) => console.log(err));
//   };
// };

export const getTranslationById = (id) => {
  const params = {
    method: "GET",
    headers: headers(),
  };
  return (dispatch) => {
    fetch(`${url}/translations/${id}`, params)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_TRANSLATION_BY_ID", payload: res }))
      .catch((err) => console.log(err));
  };
};

// No POST

export const editTranslation = (id, editedTranslation) => {
  const params = {
    method: "PATCH",
    headers: headers(),
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
    headers: headers(),
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const searchTranslationsByLanguage = (language) => {
  return (dispatch) => {
    fetch(`${url}/translations/search/language/${language}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "SEARCH_TRANSLATIONS_BY_LANGUAGE", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByLanguage = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_LANGUAGE" });
  };
};

export const searchTranslationsByWord = (word) => {
  return (dispatch) => {
    fetch(`${url}/translations/search/word/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "SEARCH_TRANSLATIONS_BY_WORD", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByWord = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_WORD" });
  };
};

export const searchTranslationsByArea = (area, word) => {
  return (dispatch) => {
    fetch(`${url}/translations/search/area/${area}/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: "SEARCH_TRANSLATIONS_BY_AREA", payload: res.data })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByArea = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_AREA" });
  };
};

export const searchTranslationsByWordGender = (word) => {
  return (dispatch) => {
    fetch(`${url}/translations/search/gender/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "SEARCH_TRANSLATIONS_BY_WORD_GENDER",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByWordGender = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_WORD_GENDER" });
  };
};

export const searchTranslationsByEtymology = (etymology_string) => {
  return (dispatch) => {
    fetch(`${url}/translations/search/etymology/${etymology_string}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "SEARCH_TRANSLATIONS_BY_ETYMOLOGY",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByEtymology = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_ETYMOLOGY" });
  };
};

export const searchTranslationsByMacrofamily = (macrofamily) => {
  return (dispatch) => {
    fetch(`${url}/translations/search/macrofamily/${macrofamily}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "SEARCH_TRANSLATIONS_BY_MACROFAMILY",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByMacrofamily = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_MACROFAMILY" });
  };
};

export const getTranslationsCount = () => {
  return (dispatch) => {
    fetch(`${url}/translations/get/translations_count`)
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
    fetch(
      `${url}/translations/search/all_translations_by_area_img/${area}/${word}`
    )
      .then((res) => res.blob())
      .then((images) => {
        outside = URL.createObjectURL(images);
        return outside;
      })
      .then((outside) =>
        dispatch({ type: "SEARCH_TRANSLATIONS_BY_AREA_IMG", payload: outside })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByAreaImg = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_IMG" });
  };
};

export const searchTranslationsByGenderImg = (area, word) => {
  return (dispatch) => {
    let outside;
    fetch(`${url}/translations/search/all_genders_by_area_img/${area}/${word}`)
      .then((res) => res.blob())
      .then((images) => {
        outside = URL.createObjectURL(images);
        return outside;
      })
      .then((outside) =>
        dispatch({
          type: "SEARCH_TRANSLATIONS_BY_AREA_GENDER_IMG",
          payload: outside,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByGenderImg = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_GENDER_IMG" });
  };
};

export const searchTranslationsByEtymologyImg = (area, word) => {
  return (dispatch) => {
    let outside;
    fetch(
      `${url}/translations/search/all_etymologies_by_area_img/${area}/${word}`
    )
      .then((res) => res.blob())
      .then((image) => {
        outside = URL.createObjectURL(image);
        return outside;
      })
      .then((outside) =>
        dispatch({
          type: "SEARCH_TRANSLATIONS_BY_AREA_ETYMOLOGY_IMG",
          payload: outside,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByEtymologyImg = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_ETYMOLOGY_IMG" });
  };
};

export const isLoading = () => {
  return {
    type: "IS_LOADING",
  };
};

export const isNotLoading = () => {
  return {
    type: "IS_NOT_LOADING",
  };
};

export const searchTranslationsByAreaEuropeMap = (area, word) => {
  return (dispatch) => {
    fetch(`${url}/translations/search/area_europe_map/${area}/${word}`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: "SEARCH_TRANSLATIONS_BY_AREA_EUROPE_MAP",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const clearSearchTranslationsByAreaEuropeMap = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SEARCH_TRANSLATIONS_BY_AREA_EUROPE_MAP" });
  };
};

// export const getSearchArea = (area) => {
//   return {
//     type: "GET_SEARCH_AREA",
//     payload: area,
//   };
// };

// export const clearGetSearchArea = () => {
//   return (dispatch) => {
//     dispatch({ type: "CLEAR_GET_SEARCH_AREA" });
//   };
// };
