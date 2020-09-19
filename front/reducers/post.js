export const initialState = {
  // idToModify: undefined,
  orgPost: {
    title: "",
    categoryId: "",
    content: null,
  },
  newPost: {
    title: "",
    categoryId: "",
    content: null,
  },
  item: {
    totalCount: 0,
    items: [],
  },
  getListLoading: false,
  getListDone: false,
  getListError: null,

  writeLoading: false,
  writeDone: false,
  writeError: null,

  updateLoading: false,
  updateDone: false,
  updateError: null,

  deleteLoading: false,
  deleteDone: false,
  deleteError: null,
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

    case "REMOVE_ORG_POST_ACTION":
      return {
        ...state,
        orgPost: {
          title: "",
          categoryId: "",
          content: null,
        },
      };

    case "WRITE_POST_REQUEST":
      return {
        ...state,
        writeLoading: true,
        writeDone: false,
        writeError: null,
      };

    case "WRITE_POST_SUCCESS":
      return {
        ...state,
        writeLoading: false,
        writeDone: true,
        writeError: null,
      };

    case "WRITE_POST_FAILURE":
      return {
        ...state,
        writeLoading: false,
        writeDone: false,
        writeError: action.error,
      };

    case "WRITE_POST_RESET":
      return {
        ...state,
        writeLoading: false,
        writeDone: false,
        writeError: null,
      };

    case "DELETE_POST_REQUEST":
      return {
        ...state,
        deleteLoading: true,
        deleteDone: false,
        deleteError: null,
      };

    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        deleteLoading: false,
        deleteDone: true,
        deleteError: null,
      };

    case "DELETE_POST_FAILURE":
      return {
        ...state,
        deleteLoading: false,
        deleteDone: false,
        deleteError: action.error,
      };

    case "DELETE_POST_RESET":
      return {
        ...state,
        deleteLoading: false,
        deleteDone: false,
        deleteError: null,
      };

    case "UPDATE_POST_REQUEST":
      return {
        ...state,
        updateLoading: true,
        updateDone: false,
        updateError: null,
      };

    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        updateLoading: false,
        updateDone: true,
        updateError: null,
      };

    case "UPDATE_POST_FAILURE":
      return {
        ...state,
        updateLoading: false,
        updateDone: false,
        updateError: action.error,
      };

    case "UPDATE_POST_RESET":
      return {
        ...state,
        updateLoading: false,
        updateDone: false,
        updateError: null,
      };

    case "GET_POST_LIST_REQUEST":
      return {
        ...state,
        getListLoading: true,
        getListDone: false,
        getListError: null,
      };

    case "GET_POST_LIST_SUCCESS":
      jsonData = getData(action.data);
      return {
        ...state,
        item: {
          totalCount: action.data.length,
          items: jsonData,
        },
        getListLoading: false,
        getListDone: true,
        getListError: null,
      };

    case "GET_POST_LIST_FAILURE":
      return {
        ...state,
        getListLoading: false,
        getListDone: false,
        getListError: action.error,
      };

    case "GET_POST_ONE_REQUEST":
      return {
        ...state,
        getListLoading: false,
        getListDone: false,
        getListError: null,
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
