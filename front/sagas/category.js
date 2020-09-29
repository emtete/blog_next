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

function applyCategorisAPI(data) {
  return axios.post("/category/apply", { data });
}

// 비동기 액션 크리에이터
function* applyCategoris(action) {
  try {
    const result = yield call(applyCategorisAPI, action.data);
    yield put({
      type: "APPLY_CATEGORY_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    console.error("error : ", err);
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "APPLY_CATEGORY_FAILURE",
      error: err.response.data, // 실패 결과
    });
  }
}

function getCategoryListAPI(data) {
  let request = "/category/getList?";

  if (data && data.userId !== undefined)
    request = request + `userId=${data.userId}`;

  return axios.get(request);
}

// 비동기 액션 크리에이터
function* getCategoryList(action) {
  try {
    const result = yield call(getCategoryListAPI, action.data);
    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      data: result.data, // 성공 결과
    });
  } catch (err) {
    console.error("error : ", err);
    yield put({
      // put은 dispatch와 같은 기능을 한다.
      type: "GET_CATEGORY_LIST_FAILURE",
      error: err.response.data, // 실패 결과
    });
  }
}

function* watchApplyCategoris() {
  yield takeLatest("APPLY_CATEGORY_REQUEST", applyCategoris);
}

function* watchGetCategoryList() {
  yield takeLatest("GET_CATEGORY_LIST_REQUEST", getCategoryList);
}

export default function* userSaga() {
  yield all([fork(watchApplyCategoris), fork(watchGetCategoryList)]);
}
