export const initialState = {
  treeData: [
    {
      title: "개발일지..",
      entries: 4,
      priority: 0,
      depth: 1,
      parent: 0,
      id: 1,
    },
    {
      title: "프로그래밍ABC",
      entries: 9,
      priority: 1,
      depth: 1,
      parent: 0,
      id: 2,
      children: [
        {
          title: "test1",
          entries: 0,
          priority: 0,
          depth: 2,
          parent: 2,
          id: 3,
        },
        {
          title: "test2",
          entries: 0,
          priority: 1,
          depth: 2,
          parent: 2,
          id: 4,
        },
      ],
    },
  ],
  newComponent: [],
  append: [],
  delete: [],
  update: [],
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

export const updateCategoryNameAction = (data) => {
  return {
    type: "UPDATE_CATEGORY_NAME_ACTION",
    data,
  };
};

const getParentPriority = (state, parent) => {
  if (parent == 0) return 0;

  for (let i = 0; i < state.treeData.length; i++) {
    if (state.treeData[i].id === parent) return state.treeData[i].priority;
  }
  return -1;
};

const reducer = (state = initialState, action) => {
  let newObject;
  let title;
  let priority;
  let parent;
  let parentPriority;

  switch (action.type) {
    case "APPEND_CHILD_TO_ROOT_ACTION":
      newObject = {
        title: action.data.title,
        entries: 0,
        priority: state.treeData.length,
        depth: 1,
        parent: 0,
        id: -(state.append.length + 1),
      };

      return {
        ...state,
        treeData: [...state.treeData, { ...newObject }],
        append: [...state.append, { ...newObject }],
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

    case "UPDATE_CATEGORY_NAME_ACTION":
      title = action.data.title;
      priority = action.data.priority;
      parent = action.data.parent;
      parentPriority = getParentPriority(state, parent);

      switch (parentPriority) {
        case 0:
          newObject = state.treeData[priority];
          break;
        case -1:
          break;
        default:
          newObject = state.treeData[parentPriority].children[priority];
      }
      newObject.title = title;

      return {
        ...state,
        treeData: [...state.treeData],
        update: [...state.update, { ...newObject }],
      };

    default:
      return state;
  }
};

export default reducer;
