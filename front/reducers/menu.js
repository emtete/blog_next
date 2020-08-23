export const initialState = {
  selected: "/",
  node: {
    key: "root",
    id: "/",
    name: "root",
    parent: null,
    // path: "/",
    children: [
      {
        key: "1",
        id: "/0",
        name: "Child - 1",
        parent: "root",
        // path: "/0",
      },
      {
        key: "3",
        id: "/1",
        name: "Child - 3",
        parent: "root",
        // path: "/1",
        children: [
          {
            key: "4",
            id: "/1/0",
            name: "Child - 4",
            parent: "3",
            // path: "/1/0",
          },
        ],
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

export const selectMenuAction = (data) => {
  return {
    type: "SELECT_MENU_ACTION",
    data,
  };
};

export const saveMenuAction = (data) => {
  return {
    type: "SAVE_MENU_ACTION",
    data,
  };
};

// const menuFinder = (menuList, selected, menuList) => {
//   const cutted = sliceOrderNumber();
//   return goToChildrenAnd(cutted, menuList, 0, );

// const goToChildrenAnd = (cutted, menuList, n) => {
//   const childrenMenuList = menuList.children[cutted[n]];
//   if (cutted.length-1 < n) {
//     return {
//       ...menuList,
//       children: [
//         ...menuList.children,
//         goToChildrenAnd(cutted, childrenMenuList, n++);
//       ]
//     };
//   } else if (cutted.length-1 === n) {
//     return {
//       ...menuList,
//       children: [
//         ...menuList.children.slice(0, selected),
//         menuList.children[cutted[n]],
//         menuList.children[cutted[n]-1],
//         ...manuList.children.slice(selected + 2),
//       ]
//     };
//     return true;
//   }
// };

//   const sliceOrderNumber = (selected) => {
//     const target = selected + "";
//     const n = target.length;
//     const result = [];

//     for (let i = 0; i < n; i + 2) {
//       result.push(parseInt(target.slice(i, i + 2)));
//     }
//     return result;
//   };
// };

//         ...menuList.children.slice(0, selected),
//         menuList.children[cutted[n]],
//         menuList.children[cutted[n]-1],
//         ...manuList.children.slice(selected + 2),

// abc(node, path, 0);
// const abc = (parentNode, path, n) => {
//   const lastIndex = parentNode.children.length-1;
//   const lastDepth = path.length -1;

//   // last
//   if (lastDepth == n) {
//     if (path[n] == 0) {
//       console.log("get1");
//     return {
//       ...parentNode,
//       // children: [
//       //   abc(parentNode.children[0], path, n++),
//       //   ...parentNode.children.slice(1)
//       // ],
//     };
//     } else if (path[n] > 0 && path[n] < lastIndex) {
//       console.log("get2");
//       return {
//         ...parentNode,
//         // children: [
//         //   ...parentNode.children.slice(0,path[n]),
//         //   abc(),
//         //   ...parentNode.children.slice(path[n]+1, lastIndex+1)
//         // ],
//       };
//     } else if (path[n] == lastIndex) {
//       console.log("get3");
//       return {
//         ...parentNode,
//         // children: [
//         //   ...parentNode.children.slice(0,lastIndex)
//         //   abc(),
//         // ],
//       };
//     }
//   }

//   // lastDepth가 아닌 경우
//   if (path[n] == 0) {
//     return {
//       ...parentNode,
//       children: [
//         abc(parentNode.children[0], path, n++),
//         ...parentNode.children.slice(1)
//       ],
//     };
//   } else if (path[n] > 0 && path[n] < lastIndex) {
//     return {
//       ...parentNode,
//       children: [
//         ...parentNode.children.slice(0,path[n]),
//         abc(),
//         ...parentNode.children.slice(path[n]+1, lastIndex+1)
//       ],
//     };
//   } else if (path[n] == lastIndex) {
//     return {
//       ...parentNode,
//       children: [
//         ...parentNode.children.slice(0,lastIndex)
//         abc(),
//       ],
//     };
//   }

// }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_MENU_ACTION":
      return {
        ...state,
        node: { ...action.data },
      };
    case "SELECT_MENU_ACTION":
      return {
        ...state,
        selected: action.data,
      };
    // case "SAVE_MENU_ACTION":
    //   return {
    //     menuList: { ...state.menuList },
    //   };
    default:
      return state;
  }
};

export default reducer;
