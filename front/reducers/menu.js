export const initialState = {
  menuList: {
    id: "root",
    name: "Parent",
    order: 0,
    upperId: null,
    children: [
      {
        id: "0",
        name: "글 작성하기",
        order: 0,
        upperId: "root",
      },
      {
        id: "1",
        name: "POST",
        order: 1,
        upperId: "root",
      },
      {
        id: "2",
        name: "Settings",
        order: 2,
        upperId: "root",
      },
    ],
  },
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
