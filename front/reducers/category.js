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
  newComponent: [],
};

export const appendChildToRootAction = (data) => {
  return {
    type: "APPEND_CHILD_TO_ROOT_ACTION",
    data,
  };
};

export const createNewComponentAction = (data) => {
  return {
    type: "CREATE_NEW_COMPONENT_ACTION",
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

    case "CREATE_NEW_COMPONENT_ACTION":
      return {
        ...state,
        newComponent: [
          {
            title: "",
          },
          ...state.newComponent,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
