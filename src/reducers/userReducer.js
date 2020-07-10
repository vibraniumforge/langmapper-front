const initialState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        authenticatingUser: false,
      };
    case "AUTHENTICATING_USER":
      return { ...state, authenticatingUser: true };
    case "AUTHENTICATED_USER":
      return {
        ...state,
        authenticatingUser: false,
      };
    case "FAILED_LOGIN":
      return {
        ...state,
        failedLogin: true,
        authenticatingUser: false,
        error: action.payload,
      };
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        loggedIn: false,
        authenticatingUser: false,
        failedLogin: false,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
