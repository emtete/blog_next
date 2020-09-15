export const initialState = {
  item: {
    totalCount: 0,
    items: [
      // {
      //   id: "1",
      //   author: "victor_77",
      //   title: "material-ui, CSS Baseline api1",
      //   category: "프로그래밍",
      //   categoryId: "758257",
      //   published: "2020-09-03 14:00",
      // },
      // {
      //   id: "2",
      //   author: "victor_77",
      //   title: "material-ui, CSS Baseline api2",
      //   category: "프로그래밍",
      //   categoryId: "758257",
      //   published: "2020-09-03 14:00",
      // },
      // {
      //   id: "3",
      //   author: "victor_77",
      //   title: "material-ui, CSS Baseline api3",
      //   category: "프로그래밍",
      //   categoryId: "758257",
      //   published: "2020-09-03 14:00",
      // },
      // {
      //   id: "4",
      //   author: "victor_77",
      //   title: "material-ui, CSS Baseline api4",
      //   category: "프로그래밍",
      //   categoryId: "758257",
      //   published: "2020-09-03 14:00",
      // },
      // {
      //   id: "5",
      //   author: "victor_77",
      //   title: "material-ui, CSS Baseline api5",
      //   category: "프로그래밍",
      //   categoryId: "758257",
      //   published: "2020-09-03 14:00",
      // },
    ],
  },
  mainPosts: {
    "/1/0": [
      {
        key: "2020101123151",
        id: "/1/0/0",
        name: "Collapsible Group Item #1",
        parentId: "/1/0",
        parentName: "POST00",
        date: "1년 전",
        content: {
          blocks: [
            {
              key: "2v2v4",
              text: "Hey this editor rocks 😀",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [
                {
                  offset: 0,
                  length: 15,
                  style: "color-rgb(0,0,0)",
                },
                {
                  offset: 16,
                  length: 7,
                  style: "color-rgb(0,0,0)",
                },
                {
                  offset: 0,
                  length: 15,
                  style: "fontsize-medium",
                },
                {
                  offset: 21,
                  length: 2,
                  style: "fontsize-medium",
                },
                {
                  offset: 0,
                  length: 15,
                  style: "fontfamily-Roboto",
                },
                {
                  offset: 16,
                  length: 7,
                  style: "fontfamily-Roboto",
                },
                {
                  offset: 9,
                  length: 6,
                  style: "BOLD",
                },
                {
                  offset: 16,
                  length: 5,
                  style: "fontsize-30",
                },
              ],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        key: "2020101123152",
        id: "/1/0/1",
        name: "Collapsible Group Item #2",
        parentId: "/1/0",
        parentName: "POST00",
        date: "2년 전",
        content: {
          blocks: [
            {
              key: "2v2v4",
              text: "Hey this 2editor rocks 😀",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [
                {
                  offset: 0,
                  length: 15,
                  style: "color-rgb(0,0,0)",
                },
                {
                  offset: 16,
                  length: 7,
                  style: "color-rgb(0,0,0)",
                },
                {
                  offset: 0,
                  length: 15,
                  style: "fontsize-medium",
                },
                {
                  offset: 21,
                  length: 2,
                  style: "fontsize-medium",
                },
                {
                  offset: 0,
                  length: 15,
                  style: "fontfamily-Roboto",
                },
                {
                  offset: 16,
                  length: 7,
                  style: "fontfamily-Roboto",
                },
                {
                  offset: 9,
                  length: 6,
                  style: "BOLD",
                },
                {
                  offset: 16,
                  length: 5,
                  style: "fontsize-30",
                },
              ],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        key: "2020101123153",
        id: "/1/0/2",
        name: "Collapsible Group Item #3",
        parentId: "/1/0",
        parentName: "POST00",
        date: "3년 전",
        content: {
          blocks: [
            {
              key: "2v2v4",
              text: "Hey this 3editor rocks 😀",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [
                {
                  offset: 0,
                  length: 15,
                  style: "color-rgb(0,0,0)",
                },
                {
                  offset: 16,
                  length: 7,
                  style: "color-rgb(0,0,0)",
                },
                {
                  offset: 0,
                  length: 15,
                  style: "fontsize-medium",
                },
                {
                  offset: 21,
                  length: 2,
                  style: "fontsize-medium",
                },
                {
                  offset: 0,
                  length: 15,
                  style: "fontfamily-Roboto",
                },
                {
                  offset: 16,
                  length: 7,
                  style: "fontfamily-Roboto",
                },
                {
                  offset: 9,
                  length: 6,
                  style: "BOLD",
                },
                {
                  offset: 16,
                  length: 5,
                  style: "fontsize-30",
                },
              ],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
    ],
  },
};

// export const addPost = (data) => {
//   return {
//     type: "ADD_POST",
//     data,
//   };
// };

const getData = (data) => {
  const arr = [];
  data.map((element) => {
    arr.push({
      id: element.UserId,
      author: element.author,
      title: element.title,
      category: "임시값",
      categoryId: element.categoryId,
      published: element.createdAt,
    });
  });

  return arr;
};

export const getPostListAction = (data) => {
  return {
    type: "GET_POST_LIST_REQUEST",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        // title: action.data.title,
        mainPosts: [
          {
            id: action.data.id,
            title: action.data.title,
            date: action.data.date,
            content: action.data.content,
          },
          ...state.mainPosts,
        ],
      };

    case "WRITE_POST_REQUEST":
      return {
        ...state,
      };

    case "WRITE_POST_SUCCESS":
      return {
        ...state,
      };

    case "WRITE_POST_FAILURE":
      return {
        ...state,
      };

    case "GET_POST_LIST_REQUEST":
      return {
        ...state,
      };

    case "GET_POST_LIST_SUCCESS":
      const jsonData = getData(action.data);
      return {
        ...state,
        item: {
          totalCount: action.data.length,
          items: jsonData,
        },
      };

    case "GET_POST_LIST_FAILURE":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
