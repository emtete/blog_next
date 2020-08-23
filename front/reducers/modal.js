export const initialState = {
  isLoginModalOpend: false,
  isLoginModalOpenning: false,
};

export const openningLoginModalAction = (data) => {
  return {
    type: "OPENNING_LOGIN_MODAL_ACTION",
    data,
  };
};

export const openedLoginModalAction = (data) => {
  return {
    type: "OPENED_LOGIN_MODAL_ACTION",
    data,
  };
};

export const closeLoginModalAction = (data) => {
  return {
    type: "CLOSE_LOGIN_MODAL_ACTION",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPENNING_LOGIN_MODAL_ACTION":
      return {
        ...state,
        isLoginModalOpenning: true,
        isLoginModalOpend: false,
      };
    case "OPENED_LOGIN_MODAL_ACTION":
      return {
        ...state,
        isLoginModalOpenning: false,
        isLoginModalOpend: true,
      };
    case "CLOSE_LOGIN_MODAL_ACTION":
      return {
        ...state,
        isLoginModalOpend: false,
        isLoginModalOpenning: false,
      };
    default:
      return state;
  }
};

export default reducer;
