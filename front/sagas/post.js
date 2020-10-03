import {
  all,
  fork,
  call,
  take,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";

function writePostAPI(data) {
  return axios.post("/post/write", { data });
}

// 비동기 액션 크리에이터
function* writePost(action) {
  try {
    const result = yield call(writePostAPI, action.data);
    yield put({
      type: "WRITE_POST_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "WRITE_POST_FAILURE",
      data: err.response.data, // 실패 결과
    });
  }
}

function updatePostAPI(data) {
  return axios.post("/post/update", { data });
}

// 비동기 액션 크리에이터
function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: "UPDATE_POST_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "UPDATE_POST_FAILURE",
      data: err.response.data, // 실패 결과
    });
  }
}

function deletePostAPI(data) {
  return axios.delete(`/post/${data.id}`);
}

// 비동기 액션 크리에이터
function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.data);
    yield put({
      type: "DELETE_POST_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "DELETE_POST_FAILURE",
      data: err.response.data, // 실패 결과
    });
  }
}

function changeCategoryInPostAPI(data) {
  return axios.post("/post/changeCategory", { data });
}

// 비동기 액션 크리에이터
function* changeCategoryInPost(action) {
  try {
    const result = yield call(changeCategoryInPostAPI, action.data);
    yield put({
      type: "CHANGE_CATEGORY_IN_POST_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "CHANGE_CATEGORY_IN_POST_FAILURE",
      data: err.response.data, // 실패 결과
    });
  }
}

function getPostListAPI(data) {
  let request = "/post/getList?";

  if (data && data.CategoryId !== undefined)
    request = request + `CategoryId=${data.CategoryId}&`;

  if (data && data.userId !== undefined)
    request = request + `userId=${data.userId}&`;

  if (data && data.includeContent)
    request = request + `includeContent=${data.includeContent}`;

  return axios.get(request);
}

// 비동기 액션 크리에이터
function* getPostList(action) {
  try {
    const result = yield call(getPostListAPI, action.data);
    yield put({
      type: "GET_POST_LIST_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "GET_POST_LIST_FAILURE",
      data: err.response.data, // 실패 결과
    });
  }
}

function getPostOneAPI(data) {
  return axios.get(`/post/getOne?id=${data.id}`);
}

// 비동기 액션 크리에이터
function* getPostOne(action) {
  try {
    const result = yield call(getPostOneAPI, action.data);
    yield put({
      type: "GET_POST_ONE_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "GET_POST_ONE_FAILURE",
      data: err.response.data, // 실패 결과
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post(`/post/images`, data);
}

// 비동기 액션 크리에이터
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: "UPLOAD_IMAGES_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "UPLOAD_IMAGES_FAILURE",
      data: err.response.data, // 실패 결과
    });
  }
}

function* watchWritePost() {
  yield takeLatest("WRITE_POST_REQUEST", writePost);
}

function* watchUpdatePost() {
  yield takeLatest("UPDATE_POST_REQUEST", updatePost);
}

function* watchDeletePost() {
  yield takeLatest("DELETE_POST_REQUEST", deletePost);
}

function* watchChangeCategoryInPost() {
  yield takeLatest("CHANGE_CATEGORY_IN_POST_REQUEST", changeCategoryInPost);
}

function* watchGetPostList() {
  yield takeLatest("GET_POST_LIST_REQUEST", getPostList);
}

function* watchGetPostOne() {
  yield takeLatest("GET_POST_ONE_REQUEST", getPostOne);
}

function* watchUploadImages() {
  yield takeLatest("UPLOAD_IMAGES_REQUEST", uploadImages);
}

export default function* postSaga() {
  yield all([
    fork(watchWritePost),
    fork(watchUpdatePost),
    fork(watchDeletePost),
    fork(watchChangeCategoryInPost),
    fork(watchGetPostList),
    fork(watchGetPostOne),
    fork(watchUploadImages),
  ]);
}
