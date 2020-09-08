export const initialState = {
  treeData: [
    {
      title: "개발일지..",
      numberOfContents: 4,
    },
    {
      title: "프로그래밍ABC",
      numberOfContents: 9,
      children: [
        {
          title: "test1",
          numberOfContents: 0,
        },
        {
          title: "test2",
          numberOfContents: 0,
        },
      ],
    },
  ],
};

export const appendChildToRootAction = (data) => {
  return {
    type: "APPEND_CHILD_TO_ROOT_ACTION",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "APPEND_CHILD_TO_ROOT_ACTION":
      return {
        ...state,
        treeData: [
          ...state.treeData,
          {
            title: action.data.title,
            numberOfContents: 0,
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
