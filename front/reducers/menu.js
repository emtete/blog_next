export const initialState = {
  menuList: [
    { name: "글 작성하기", id: 0, upperId: null },
    { name: "POST", id: 1, upperId: null },
    { name: "Settings", id: 2, upperId: null },
  ],
};

export const reorderMenuAction = (data) => {
  return {
    type: "REORDER_MENU_ACTION",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REORDER_MENU_ACTION":
      return {
        menuList: [
          ...state.manuList.slice(0, action.data),
          state.manuList[action.data + 1],
          state.manuList[action.data],
          ...state.manuList.slice(action.data + 2),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
