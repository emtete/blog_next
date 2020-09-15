export const initialState = {
  orgPost: {
    title: "",
  },
  newPost: {
    title: "",
  },
  item: {
    totalCount: 0,
    items: [],
  },
};

const getData = (data) => {
  const arr = [];
  data.map((element) => {
    arr.push({
      id: element.id,
      author: element.author,
      title: element.title,
      content: element.content,
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

export const getPostOneAction = (data) => {
  return {
    type: "GET_POST_ONE_REQUEST",
    data,
  };
};

const reducer = (state = initialState, action) => {
  let jsonData;

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
      console.log(action.data);
      jsonData = getData(action.data);
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

    case "GET_POST_ONE_REQUEST":
      return {
        ...state,
      };

    case "GET_POST_ONE_SUCCESS":
      return {
        ...state,
        orgPost: {
          id: action.data.id,
          author: action.data.author,
          title: action.data.title,
          content: action.data.content,
          category: "임시값",
          categoryId: action.data.categoryId,
          published: action.data.createdAt,
        },
        newPost: {
          id: action.data.id,
          author: action.data.author,
          title: action.data.title,
          content: action.data.content,
          category: "임시값",
          categoryId: action.data.categoryId,
          published: action.data.createdAt,
        },
      };

    case "GET_POST_ONE_FAILURE":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
