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
  categoryInEditMode: [],
  newComponent: [],
  appendedCategories: [],
  deletedCategories: [],
  updatedCategories: [],
  isMoveMode: false,
  selectedNode: null,
  treeHelper: {
    // cnt: 0,
    // appendCnt: 0,
    // nodeCount: 0,
    indexPath: {
      1: [0],
      2: [1],
      3: [1, 0],
      4: [1, 1],
    },
  },
};

export const deleteNodeAction = (data) => {
  return {
    type: "DELETE_NODE_ACTION",
    data,
  };
};

export const setUpdateModeAction = (data) => {
  return {
    type: "SET_UPDATE_MODE_ACTION",
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

export const toggleIsMoveModeAction = (data) => {
  return {
    type: "TOGGLE_IS_MOVE_MODE_ACTION",
    data,
  };
};

export const setSelectedNodeAction = (data) => {
  return {
    type: "SET_SELECTED_NODE_ACTION",
    data,
  };
};

// const getNode = (state, action) => {
//   const clone = deepCopy(state.treeData);
//   const id = action.data.id;
//   const targetPath = state.treeHelper.indexPath[id];

//   if (targetPath.length === 1) {
//     return clone[targetPath[0]];
//   } else if (targetPath.length === 2) {
//     return clone[targetPath[0]].children[targetPath[1]];
//   }
//   return undefined;
// };

const deepCopy = (target) => {
  return JSON.parse(JSON.stringify(target));
};

// 타겟을 삭제한 트리데이터를 리턴한다.
const getDeletedTargetTreeData = (state, id) => {
  const targetIndex = state.treeHelper.indexPath[id];
  const treeDataCopied = deepCopy(state.treeData);
  const targetDepth = targetIndex.length;

  if (targetDepth === 1) {
    treeDataCopied.splice(targetIndex[0], 1);
  } else if (targetDepth === 2) {
    treeDataCopied[targetIndex[0]].children.splice(targetIndex[1], 1);
  }

  return [treeDataCopied, targetDepth];
};

// 매개변수로 주어진 depth의 priority를 다시 세팅, 해당 트리데이터를 리턴한다.
const settingPriorityIn = (treeData, depth, state, id) => {
  if (depth === 1) {
    treeData.map((n, i) => {
      n.priority = i;
    });
  } //
  else if (depth === 2) {
    const parentIndex = state.treeHelper.indexPath[id][0];

    treeData[parentIndex].children.map((n, i) => {
      n.priority = i;
    });
  }
  return treeData;
};

const manageCategoryCrud = (state, id, crud) => {
  const appendedClone = state.appendedCategories;
  const updatedClone = state.updatedCategories;
  const deletedClone = state.deletedCategories;

  const appendedIndex = appendedClone.findIndex((eid) => eid == id);
  const updatedIndex = updatedClone.findIndex((eid) => eid == id);
  const deletedIndex = deletedClone.findIndex((eid) => eid == id);

  switch (crud) {
    case "c":
      break;
    case "u":
      // appended에 id가 있다면 그냥 둠
      // updated에 id가 있다면 그냥 둠
      // 둘 모두에 id가 없다면 추가.
      if (appendedIndex == -1 && updatedIndex == -1) {
        updatedClone.push(id);
      }

      break;
    case "d":
      // append에 id가 있다면 삭제
      // update에 id가 있다면 삭제 후 deleted에 추가
      // 두곳에 아무것도 없다면 deleted에 추가
      if (appendedIndex != -1) {
        appendedClone.splice(appendedIndex, 1);
      } // if (updatedIndex == -1)
      else {
        updatedIndex != -1 && updatedClone.splice(updatedIndex, 1);
        deletedClone.push(id);
      }

      break;
  }

  return [appendedClone, updatedClone, deletedClone];
};

const reducer = (state = initialState, action) => {
  let newObject;
  let title;
  let priority;
  let parent;
  let parentPriority;
  let targetIndex;
  let clone;
  let sortedData;
  let newId;
  let index;
  let node;
  let path;
  let id;
  let updatedNode;
  let firstNode;
  let secondNode;
  let treeDataCopied;
  let targetDepth;
  let appendedClone;
  let updatedClone;
  let deletedClone;
  let _;

  switch (action.type) {
    case "CREATE_NEW_COMPONENT_ACTION":
      newId =
        state.treeData.length > 0
          ? -parseInt(state.treeData[state.treeData.length - 1].priority) - 1
          : -1;

      newObject = {
        title: "",
        entries: 0,
        priority: state.treeData.length,
        depth: 1,
        parent: 0,
        id: newId,
        isNew: true,
      };

      return {
        ...state,
        treeData: [...state.treeData, { ...newObject }],
        appendedCategories: [...state.appendedCategories, newId],
        treeHelper: {
          ...state.treeHelper,
          indexPath: {
            ...state.treeHelper.indexPath,
            [newObject.id]: [newObject.priority],
          },
        },
        categoryInEditMode: [...state.categoryInEditMode, newId],
      };

    case "TOGGLE_IS_MOVE_MODE_ACTION":
      return {
        ...state,
        isMoveMode: action.data.isMoveMode,
      };

    case "SET_UPDATE_MODE_ACTION":
      clone = deepCopy(state.categoryInEditMode);
      id = action.data.id;

      if (action.data.isEditMode) {
        clone.push(id);
      } else {
        targetIndex = clone.findIndex((eid) => eid == id);
        clone.splice(targetIndex, 1);
      }

      return {
        ...state,
        categoryInEditMode: [...clone],
      };

    case "SET_SELECTED_NODE_ACTION":
      return {
        ...state,
        selectedNode: action.data.selectedNode,
      };

    case "DELETE_NODE_ACTION":
      id = action.data.id;
      [treeDataCopied, targetDepth] = getDeletedTargetTreeData(state, id);
      sortedData = settingPriorityIn(treeDataCopied, targetDepth, state, id);

      [appendedClone, updatedClone, deletedClone] = manageCategoryCrud(
        state,
        id,
        "d"
      );

      return {
        ...state,
        treeData: [...sortedData],
        appendedCategories: [...appendedClone],
        updatedCategories: [...updatedClone],
        deletedCategories: [...deletedClone],
      };

    case "UPDATE_CATEGORY_NAME_ACTION":
      id = action.data.id;
      title = action.data.title;
      clone = deepCopy(state.treeData);
      path = state.treeHelper.indexPath[id];

      if (path.length === 1) {
        updatedNode = clone[path[0]];
        updatedNode.title = title;
      } //
      else if (path.length === 2) {
        updatedNode = clone[path[0]].children[path[1]];
        updatedNode.title = title;
      }

      [_, updatedClone, _] = manageCategoryCrud(state, id, "u");

      return {
        ...state,
        treeData: [...clone],
        updatedCategories: [...updatedClone],
      };

    default:
      return state;
  }
};

export default reducer;
