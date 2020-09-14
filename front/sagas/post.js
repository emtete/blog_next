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
  console.log(111);
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

// 비동기 액션이 실행될 때까지 기다리는
// 이벤트 리스너와 같은 기능을 하는 함수.
// take는 일회용이라서 한번만 실행하면 사라진다.
// 그래서 takeEvery를 사용한다.
// takeLatest는 여러번 요청을 보내게 되면 (완료되지 않은 요청 중) 마지막 요청만 실행한다.
// 응답을 한번 취소하는거고 요청은 두번 다 가게된다.
// throttle은 정한 시간 안에는 한번만 요청을 보내게 한다.
// function* watchLogIn() {
//   yield takeLatest("LOG_IN_REQUEST", logIn);
//   // yield throttle("LOG_IN_REQUEST", logIn, 10000);
// }

// function* watchLogOut() {
//   yield takeLatest("LOG_OUT_REQUEST", logOut);
// }

function* watchWritePost() {
  yield takeLatest("WRITE_POST_REQUEST", writePost);
}

export default function* postSaga() {
  yield all([fork(watchWritePost)]);
}
