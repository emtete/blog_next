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
  isDrawer: true,
  imagePaths: null,
  isViewMode: false,
  selectedPost: null,

  saveImagesLoading: true,
  saveImagesDone: false,
  saveImagesError: null,
};

const reducer = (state = initialState, action) => {
  let jsonData;

  switch (action.type) {
    case "SET_TOGGLE_IS_DRAWER_ACTION":
      return {
        ...state,
        isDrawer: action.data.isDrawer,
      };

    case "SET_SELECTED_POST_ACTION":
      return {
        ...state,
        selectedPost: action.data.post,
      };

    case "UPLOAD_IMAGES_REQUEST":
      return {
        ...state,
        uploadImagesLoading: true,
        uploadImagesDone: false,
        uploadImagesError: null,
      };

    case "UPLOAD_IMAGES_SUCCESS":
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesDone: true,
        uploadImagesError: null,

        imagePaths: action.data,
      };

    case "UPLOAD_IMAGES_FAILURE":
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesDone: false,
        uploadImagesError: String(action.error),
      };

    case "UPLOAD_IMAGES_RESET":
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesDone: false,
        uploadImagesError: null,
      };

    case "START_IS_VIEW_MODE_ACTION":
      return {
        ...state,
        isViewMode: true,
      };

    case "END_IS_VIEW_MODE_ACTION":
      return {
        ...state,
        isViewMode: false,
      };

    default:
      return state;
  }
};

export default reducer;
