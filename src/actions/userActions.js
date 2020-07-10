const url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001/api/v1"
    : "https://secure-refuge-32252.herokuapp.com/api/v1";

export const getUsers = () => {
  return (dispatch) => {
    fetch(`${url}/users`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_USERS", payload: res }))
      .catch((err) => console.log(err));
  };
};

export const getUserById = (id) => {
  return (dispatch) => {
    fetch(`${url}/users/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "GET_USER_BY_ID", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const createUser = (user) => {
  const data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  };
  return (dispatch) => {
    fetch(`${url}/users`, data)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "CREATE_USER", payload: res.data }))
      .catch((err) => console.log(err));
  };
};

// ========================================

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: "AUTHENTICATING_USER",
    });
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: username,
          password: password,
        },
      }),
    };
    fetch(`${url}/auth/login`, data)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => {
        localStorage.setItem("jwt", res.jwt);
        dispatch({
          type: "SET_CURRENT_USER",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(authenticatingUser());
    fetch(`${url}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => dispatch(setCurrentUser(res.data)))
      .catch((err) => console.log(err));
  };
};

export const setCurrentUser = (userData) => {
  return {
    type: "SET_CURRENT_USER",
    payload: userData,
  };
};

export const failedLogin = (errorMsg) => {
  return {
    type: "FAILED_LOGIN",
    payload: errorMsg,
  };
};

export const authenticatingUser = () => {
  return {
    type: "AUTHENTICATING_USER",
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({
      type: "LOGOUT",
    });
  };
};
