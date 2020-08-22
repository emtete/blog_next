export const initialState = {
  menuList: {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REORDER_MENU_ACTION":
      return {
        ...state,
        menuList: {
          ...state.menuList,
          children: [
            (state.menuList.children[1] = {
              ...state.menuList.children[1],
              id: "/0",
            }),
            (state.menuList.children[0] = {
              ...state.menuList.children[0],
              id: "/1",
            }),
          ],
        },
      };
    case "SAVE_MENU_ACTION":
      return {
        menuList: { ...state.menuList },
      };
    default:
      return state;
  }
};

export default reducer;
