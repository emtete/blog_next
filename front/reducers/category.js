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

export const spliceNodeAction = (data) => {
  return {
    type: "SPLICE_NODE_ACTION",
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

const resetIndexPath = (treeDataCopied) => {
  const clonePath = {};

  treeDataCopied.map((node1, index1) => {
    const children = node1.children;
    if (Array.isArray(children) && children.length > 0) {
      children.map((node2, index2) => {
        clonePath[node2.id] = [index1, index2];
      });
    }
    clonePath[node1.id] = [index1];
  });

  return clonePath;
};

const resetIndexPathAndPriority = (treeDataCopied, indexPath) => {
  const clonePath = {};
  const updatedIdArr = [];

  treeDataCopied.map((node1, index1) => {
    const children = node1.children;
    if (Array.isArray(children) && children.length > 0) {
      children.map((node2, index2) => {
        // path의 값이 이전과 다르다면
        const indexPath2 = indexPath[node2.id];
        if (indexPath2[0] != index1 || indexPath2[1] != index2) {
          updatedIdArr.push(node2.id);
        }

        clonePath[node2.id] = [index1, index2];
        node2.priority = index2;
      });
    }

    // path의 값이 이전과 다르다면
    const indexPath1 = indexPath[node1.id];
    if (indexPath1[0] != index1) {
      updatedIdArr.push(node1.id);
    }

    clonePath[node1.id] = [index1];
    node1.priority = index1;
  });

  return [clonePath, treeDataCopied, updatedIdArr];
};

// 매개변수로 주어진 depth의 priority를 다시 세팅, 해당 트리데이터를 리턴한다.
const settingPriorityIn = (treeData, depth, state, id) => {
  const updatedIdArr = [];
  if (depth === 1) {
    treeData.map((n, i) => {
      n.priority = i;
      updatedIdArr.push(n.id);
    });
  } //
  else if (depth === 2) {
    const parentIndex = state.treeHelper.indexPath[id][0];

    treeData[parentIndex].children.map((n, i) => {
      n.priority = i;
      updatedIdArr.push(n.id);
    });
  }
  return [treeData, updatedIdArr];
};

const manageCategoryCrud = (state, updatedIdArr, deletedIdArr) => {
  const appendedClone = deepCopy(state.appendedCategories);
  const updatedClone = deepCopy(state.updatedCategories);
  const deletedClone = deepCopy(state.deletedCategories);

  let appendedIndex;
  let updatedIndex;
  // let deletedIndex;

  // appended에 id가 있다면 그냥 둠
  // updated에 id가 있다면 그냥 둠
  // 둘 모두에 id가 없다면 추가.
  if (updatedIdArr) {
    updatedIdArr.map((uid) => {
      appendedIndex = appendedClone.findIndex((eid) => eid == uid);
      updatedIndex = updatedClone.findIndex((eid) => eid == uid);
      if (appendedIndex == -1 && updatedIndex == -1) {
        updatedClone.push(uid);
      }
    });
  }

  // append에 id가 있다면 삭제
  // update에 id가 있다면 삭제 후 deleted에 추가
  // 두곳에 아무것도 없다면 deleted에 추가
  if (deletedIdArr) {
    deletedIdArr.map((did) => {
      appendedIndex = appendedClone.findIndex((eid) => eid == did);
      updatedIndex = updatedClone.findIndex((eid) => eid == did);
      if (appendedIndex != -1) {
        appendedClone.splice(appendedIndex, 1);
      } // if (updatedIndex == -1)
      else {
        updatedIndex != -1 && updatedClone.splice(updatedIndex, 1);
        deletedClone.push(did);
      }
    });
  }

  return [appendedClone, updatedClone, deletedClone];
};

const reducer = (state = initialState, action) => {
  let newObject;
  let title;
  let priority;
  let parent;
  let parentPriority;
  let selectedIndex;
  let targetIndex;
  let modalIndex;
  let index;
  let clone;
  let sortedData;
  let newId;
  let node;
  let modalNode;
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
  let updatedIdArr;
  let clonePath;
  let isMoveInSameCategory;
  let isDown;

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
        selectedNode: deepCopy(action.data.selectedNode),
      };

    case "SPLICE_NODE_ACTION":
      modalNode = state.selectedNode;
      clone = deepCopy(state.treeData);
      targetIndex = action.data.targetIndex;
      isMoveInSameCategory = action.data.isMoveInSameCategory;
      clonePath = deepCopy(state.treeHelper.indexPath);
      modalIndex = clonePath[modalNode.id];
      isDown = false;

      // 아래로 이동하는 경우, 이동 전 노드가 삭제되면 그 이후의 노드들의 위치가 -1된다.
      // 위로 이동하는 경우, 노드를 위에 끼워넣으면 원본의 위치가 +1된다.
      if (isMoveInSameCategory && targetIndex.length === 1) {
        isDown = targetIndex[0] > modalIndex[0];
        if (isDown) {
          targetIndex[0] = targetIndex[0] - 1;
        } else {
          modalIndex[0] = modalIndex[0] + 1;
        }
      } //
      else if (isMoveInSameCategory && targetIndex.length === 2) {
        isDown = targetIndex[1] > modalIndex[1];
        if (isDown) {
          targetIndex[1] = targetIndex[1] - 1;
        } else {
          modalIndex[1] = modalIndex[1] + 1;
        }
      }

      // modalNode 끼워넣기
      if (targetIndex.length === 1) {
        clone.splice(targetIndex[0], 0, modalNode);
      } else if (targetIndex.length === 2) {
        clone[targetIndex[0]].children.splice(targetIndex[1], 0, modalNode);
      }

      // 원본 지우기
      if (modalIndex.length === 1) {
        clone.splice(modalIndex[0], 1);
      } else if (modalIndex.length === 2) {
        clone[modalIndex[0]].children.splice(modalIndex[1], 1);
      }

      // 순서 재설정
      [clonePath, clone, updatedIdArr] = resetIndexPathAndPriority(
        clone,
        clonePath
      );

      [_, updatedClone, _] = manageCategoryCrud(state, updatedIdArr);

      return {
        ...state,
        // selectedNode: deepCopy(action.data.selectedNode),
        treeData: [...clone],
        treeHelper: {
          ...state.treeHelper,
          indexPath: {
            ...clonePath,
          },
        },
        updatedCategories: [...updatedClone],
      };

    case "DELETE_NODE_ACTION":
      id = action.data.id;

      [treeDataCopied, targetDepth] = getDeletedTargetTreeData(state, id);
      [sortedData, updatedIdArr] = settingPriorityIn(
        treeDataCopied,
        targetDepth,
        state,
        id
      );
      clonePath = resetIndexPath(sortedData);

      [appendedClone, updatedClone, deletedClone] = manageCategoryCrud(
        state,
        updatedIdArr,
        [id]
      );

      return {
        ...state,
        treeData: [...sortedData],
        appendedCategories: [...appendedClone],
        updatedCategories: [...updatedClone],
        deletedCategories: [...deletedClone],
        treeHelper: {
          ...state.treeHelper,
          indexPath: {
            ...clonePath,
          },
        },
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

      [_, updatedClone, _] = manageCategoryCrud(state, [id]);

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
