export const initialState = {
  applyLoading: false,
  applyDone: false,
  applyError: null,

  getListLoading: false,
  getListDone: false,
  getListError: null,

  treeData: [
    // {
    //   title: "개발일지..",
    //   entries: 4,
    //   priority: 0,
    //   depth: 1,
    //   parent: 0,
    //   id: 1,
    // },
    // {
    //   title: "프로그래밍ABC",
    //   entries: 9,
    //   priority: 1,
    //   depth: 1,
    //   parent: 0,
    //   id: 2,
    //   children: [
    //     {
    //       title: "test1",
    //       entries: 0,
    //       priority: 0,
    //       depth: 2,
    //       parent: 2,
    //       id: 3,
    //     },
    //     {
    //       title: "test2",
    //       entries: 0,
    //       priority: 1,
    //       depth: 2,
    //       parent: 2,
    //       id: 4,
    //     },
    //   ],
    // },
    // {
    //   title: "test3",
    //   entries: 4,
    //   priority: 2,
    //   depth: 1,
    //   parent: 0,
    //   id: 5,
    // },
    // {
    //   title: "test4",
    //   entries: 4,
    //   priority: 3,
    //   depth: 1,
    //   parent: 0,
    //   id: 6,
    //   children: [
    //     {
    //       title: "test41",
    //       entries: 0,
    //       priority: 0,
    //       depth: 2,
    //       parent: 6,
    //       id: 8,
    //     },
    //     {
    //       title: "test42",
    //       entries: 0,
    //       priority: 1,
    //       depth: 2,
    //       parent: 6,
    //       id: 9,
    //     },
    //     {
    //       title: "test43",
    //       entries: 0,
    //       priority: 2,
    //       depth: 2,
    //       parent: 6,
    //       id: 10,
    //     },
    //   ],
    // },
    // {
    //   title: "test5",
    //   entries: 4,
    //   priority: 4,
    //   depth: 1,
    //   parent: 0,
    //   id: 7,
    // },
  ],
  categoryInEditMode: [],
  newComponent: [],
  appendedCategories: [],
  deletedCategories: [],
  updatedCategories: [],
  isMoveMode: false,
  selectedNode: null,
  treeHelper: {
    cnt: 0,
    // appendCnt: 0,
    // nodeCount: 0,
    indexPath: {
      // 1: [0],
      // 2: [1],
      // 3: [1, 0],
      // 4: [1, 1],
    },
  },
};

export const resetIndexPathAction = (data) => {
  return {
    type: "RESET_INDEX_PATH_ACTION",
    data,
  };
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
  const treeDataCopied = deepCopy(state.treeData);
  const targetIndex = state.treeHelper.indexPath[id];
  const targetNode1 = treeDataCopied[targetIndex[0]];
  const targetDepth = targetIndex.length;
  const deletedChildren = [];

  if (targetDepth === 1) {
    if (getIsArray(targetNode1.children)) {
      targetNode1.children.map((node) => {
        deletedChildren.push(node.id);
      });
    }
    treeDataCopied.splice(targetIndex[0], 1);
  } else if (targetDepth === 2) {
    targetNode1.children.splice(targetIndex[1], 1);
  }

  return [treeDataCopied, targetDepth, deletedChildren];
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

const getNodeCtn = (treeDataCopied) => {
  let cnt = 0;

  treeDataCopied.map((node1, index1) => {
    const children = node1.children;
    if (Array.isArray(children) && children.length > 0) {
      children.map((node2, index2) => {
        cnt++;
      });
    }
    cnt++;
  });
  return cnt;
};

const resetIndexPathAndPriority = (treeDataCopied, indexPath) => {
  const clonePath = {};
  const updatedIdArr = [];

  treeDataCopied.map((node1, index1) => {
    const children = node1.children;
    // if (Array.isArray(children) && children.length > 0) {
    if (getIsArray(children)) {
      children.map((node2, index2) => {
        // path의 값이 이전과 다르다면
        const indexPath2 = indexPath[node2.id];
        // if (indexPath2[0] != index1 || indexPath2[1] != index2) {
        if (indexPath2[1] != index2) {
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
// const settingPriorityIn = (treeData, depth, state, id) => {
//   const updatedIdArr = [];
//   let index1;

//   if (depth === 1) {
//     treeData.map((n, i) => {
//       index1 = state.treeHelper.indexPath[n.id][0];
//       if (index1 != n.priority) {
//         n.priority = i;
//         updatedIdArr.push(n.id);
//       }
//     });
//   } //
//   else if (depth === 2) {
//     const parentIndex = state.treeHelper.indexPath[id][0];
//     treeData[parentIndex].children.map((n, i) => {
//       n.priority = i;
//       updatedIdArr.push(n.id);
//     });
//   }

//   return [treeData, updatedIdArr];
// };

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

// isChanged의 목적은 modalNode의 위치변화를 체크하는것
const getIsChanged = (clone, clonePath, modalNode) => {
  const beforePath = clonePath[modalNode.id];
  let isChanged;

  if (beforePath.length === 1) {
    const afterIndex = clone.findIndex((e) => e.id === modalNode.id);
    isChanged = afterIndex !== beforePath[0] ? 0 : -1;
  } //
  else if (beforePath.length === 2) {
    const afterIndex1 = clone.findIndex((e) => e.id === modalNode.parent);
    const afterIndex2 = clone[afterIndex1].children.findIndex(
      (e) => e.id === modalNode.id
    );
    isChanged =
      afterIndex1 != beforePath[0] ? 0 : afterIndex2 != beforePath[1] ? 1 : -1;
  }
  return isChanged;
};

// 불러온 treeData를 계층구조로 변환한다.
const flatToHierarchy = (flatData) => {
  const clone = deepCopy(flatData);
  const treeData = [];

  flatData.map((node) => {
    if (node.depth == 1) treeData.push(node);
  });

  const nextIndex = treeData.length;

  for (let i = nextIndex; i < clone.length; i++) {
    const parentId = clone[i].parent;
    const parentIndex = treeData.findIndex((e) => e.id == parentId);
    const parentNode = treeData[parentIndex];
    if (parentNode["children"] === undefined) parentNode["children"] = [];
    parentNode["children"].push(clone[i]);
  }

  return treeData;
};

const getIsArray = (e) => {
  return Array.isArray(e) && e.length > 0;
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
  let modalNodeClone;
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
  let isChanged;
  let nodeCnt;
  let deletedChildren;

  switch (action.type) {
    case "APPLY_CATEGORY_REQUEST":
      return {
        ...state,
        applyLoading: true,
        applyDone: false,
        applyError: null,
      };

    case "APPLY_CATEGORY_SUCCESS":
      return {
        ...state,
        applyLoading: false,
        applyDone: true,
        applyError: null,
      };

    case "APPLY_CATEGORY_FAILURE":
      return {
        ...state,
        applyLoading: false,
        applyDone: false,
        applyError: action.error,
      };

    case "APPLY_CATEGORY_RESET":
      return {
        ...state,
        applyLoading: false,
        applyDone: false,
        applyError: null,
      };

    case "GET_CATEGORY_LIST_REQUEST":
      return {
        ...state,
        getListLoading: true,
        getListDone: false,
        getListError: null,
      };

    case "GET_CATEGORY_LIST_SUCCESS":
      return {
        ...state,
        getListLoading: false,
        getListDone: true,
        getListError: null,
        treeData: [...flatToHierarchy(action.data)],
      };

    case "GET_CATEGORY_LIST_FAILURE":
      return {
        ...state,
        getListLoading: false,
        getListDone: false,
        getListError: action.error,
      };

    case "GET_CATEGORY_LIST_RESET":
      return {
        ...state,
        getListLoading: false,
        getListDone: false,
        getListError: null,
      };

    case "CREATE_NEW_COMPONENT_ACTION":
      newId = -parseInt(state.treeHelper.cnt) - 1;

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
          cnt: state.treeHelper.cnt + 1,
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

    case "RESET_INDEX_PATH_ACTION":
      clone = deepCopy(state.treeData);
      clonePath = resetIndexPath(clone);
      nodeCnt = getNodeCtn(clone);

      return {
        ...state,
        treeHelper: {
          ...state.treeHelper,
          indexPath: {
            ...clonePath,
          },
          cnt: nodeCnt,
        },
      };

    case "SPLICE_NODE_ACTION":
      modalNode = state.selectedNode;
      modalNodeClone = deepCopy(modalNode);
      clone = deepCopy(state.treeData);
      targetIndex = action.data.targetIndex;
      isMoveInSameCategory = action.data.isMoveInSameCategory;
      clonePath = deepCopy(state.treeHelper.indexPath);
      modalIndex = clonePath[modalNode.id];
      isDown = false;

      // 아래로 이동하는 경우, 이동 전 노드가 삭제되면 그 이후의 노드들의 위치가 -1된다.
      // 위로 이동하는 경우, 노드를 위에 끼워넣으면 원본의 위치가 +1된다.
      if (targetIndex.length === 1) {
        isDown = targetIndex[0] > modalIndex[0];
      } //
      else if (targetIndex.length === 2) {
        isDown = targetIndex[1] > modalIndex[1];
      }

      // modalNode 끼워넣기
      // 끼워넣기 이후 이전에 저장된 indexPath와 실제 treeData의 index가
      // 서로 일치하지 않을 수 있다. (treeData의 순서가 바뀌기 때문에)
      if (targetIndex.length === 1) {
        clone.splice(targetIndex[0], 0, modalNodeClone);
        modalNodeClone.parent = 0;
        modalNodeClone.depth = 1;
      } else if (targetIndex.length === 2) {
        const target0 = clone[targetIndex[0]];
        if (target0.children) {
          target0.children.splice(targetIndex[1], 0, modalNodeClone);
        } //
        else {
          target0["children"] = [];
          target0["children"].push(modalNodeClone);
        }
        modalNodeClone.parent = target0.id;
        modalNodeClone.depth = 2;
      }

      // modalNode의 위치가 바꼈는지 확인.
      isChanged = getIsChanged(clone, clonePath, modalNode);

      // path 변화가 있다면 modalIndex 수정
      if (isChanged != -1) {
        modalIndex[isChanged] = isDown
          ? modalIndex[isChanged] - 1
          : modalIndex[isChanged] + 1;
      } //

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
      clonePath = deepCopy(state.treeHelper.indexPath);

      [treeDataCopied, targetDepth, deletedChildren] = getDeletedTargetTreeData(
        state,
        id
      );
      // [sortedData, updatedIdArr] = settingPriorityIn(
      //   treeDataCopied,
      //   targetDepth,
      //   state,
      //   id
      // );
      [clonePath, treeDataCopied, updatedIdArr] = resetIndexPathAndPriority(
        treeDataCopied,
        clonePath
      );
      // clonePath = resetIndexPath(sortedData);

      [appendedClone, updatedClone, deletedClone] = manageCategoryCrud(
        state,
        updatedIdArr,
        [id, ...deletedChildren]
      );

      return {
        ...state,
        treeData: [...treeDataCopied],
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
