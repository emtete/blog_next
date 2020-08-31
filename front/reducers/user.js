export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: false,
  user: null,
  signUpdata: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoutAction = (data) => {
  return {
    type: "LOG_OUT_REQUEST",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
