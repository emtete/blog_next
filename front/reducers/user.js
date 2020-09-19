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
  isLoginMode: false,
  isAdminMode: false,
  signUpdata: {},
  loginData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOG_IN_MODE_ACTION":
      return {
        ...state,
        isLoginMode: true,
      };

    case "END_LOG_IN_MODE_ACTION":
      return {
        ...state,
        isLoginMode: false,
      };

    case "START_ADMIN_MODE_ACTION":
      return {
        ...state,
        isAdminMode: true,
      };

    case "END_ADMIN_MODE_ACTION":
      return {
        ...state,
        isAdminMode: false,
      };

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

        logInLoading: false,
        logInDone: false,
        logInError: null,

        me: null,
        isAdminMode: false,
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
