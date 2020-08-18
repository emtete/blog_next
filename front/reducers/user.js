const initialState = {
  isLoggedIn: false,
  user: null,
  signUpdata: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = (data) => {
  return {
    type: "LOG_OUT",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
