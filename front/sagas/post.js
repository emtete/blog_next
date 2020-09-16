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

function getPostListAPI(data) {
  return axios.get("/post/getList", { data });
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
  // return axios.get("/post/getOne", { id: data.id });
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

function* watchWritePost() {
  yield takeLatest("WRITE_POST_REQUEST", writePost);
}

function* watchUpdatePost() {
  yield takeLatest("UPDATE_POST_REQUEST", updatePost);
}

function* watchGetPostList() {
  yield takeLatest("GET_POST_LIST_REQUEST", getPostList);
}

function* watchGetPostOne() {
  yield takeLatest("GET_POST_ONE_REQUEST", getPostOne);
}

export default function* postSaga() {
  yield all([
    fork(watchWritePost),
    fork(watchUpdatePost),
    fork(watchGetPostList),
    fork(watchGetPostOne),
  ]);
}
