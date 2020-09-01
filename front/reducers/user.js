export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,

  logOutLoading: false,
  logOutDone: false,
  logOutError: false,

  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: false,

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

    case "LOAD_MY_INFO_REQUEST":
      return {
        ...state,
        loadMyInfoLoading: true,
        loadMyInfoDone: false,
        loadMyInfoError: null,
      };
    case "LOAD_MY_INFO_SUCCESS":
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoDone: true,
        loadMyInfoError: null,
        me: action.data,
      };
    case "LOAD_MY_INFO_FAILURE":
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoDone: false,
        loadMyInfoError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
