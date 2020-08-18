const initialState = {
  name: "최종호",
  age: "32",
  password: "12345",
};

const changeNickname = {
  type: "CHANGE_NICKNAME",
  data: "최한울",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_NICKNAME":
      return {
        ...state,
        name: action.data,
      };
    default:
  }
};

export default rootReducer;
