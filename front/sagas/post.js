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

function* watchUploadImages() {
  yield takeLatest("UPLOAD_IMAGES_REQUEST", uploadImages);
}

export default function* postSaga() {
  yield all([fork(watchUploadImages)]);
}
