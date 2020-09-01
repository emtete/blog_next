export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: false,
  user: null,
  me: null,
  signUpdata: {},
  loginData: {},
};

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: "LOG_OUT_REQUEST",
    data,
  };
};

const dummyUser = (data) => ({
  ...data,
  nickname: "DEV LIFE",
  id: 1,
  Post: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        logInError: null,
        me: action.data,
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        logInLoading: false,
        logInDone: false,
        logInError: action.error,
      };

    case "LOG_OUT_REQUEST":
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: false,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        logOutError: false,
        me: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        logOutLoading: false,
        logOutDone: false,
        logOutError: true,
      };
    default:
      return state;
  }
};

export default reducer;
