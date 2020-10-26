import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { FormControl, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import useInput from "../../hooks/useInput";

const modalStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LoginModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const modalClasses = modalStyles();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const me = useSelector((state) => state.user.me);
  const { logInLoading, logInDone, logInError } = useSelector(
    (state) => ({
      logInLoading: state.user.logInLoading,
      logInDone: state.user.logInDone,
      logInError: state.user.logInError,
    }),
    shallowEqual
  );

  // 모달 바깥 클릭시, 창 닫기
  const clickOutSideEvent = (e) => {
    if (e.target.className === "container_layer")
      dispatch({ type: "END_LOG_IN_MODE_ACTION" });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch({ type: "LOG_IN_REQUEST", data: { email: id, password } });
  };

  // 로그인 에러시.
  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  // 로그인 성공시.
  useEffect(() => {
    if (logInDone) {
      const data = { userId: me ? me.id : 1 };
      const expiresTime = new Date(new Date().getTime() + 30 * 60 * 1000);

      dispatch({ type: "GET_CATEGORY_LIST_REQUEST", data });
      dispatch({ type: "END_LOG_IN_MODE_ACTION" });
      Cookies.set("id", me.id, { expires: expiresTime });
      router.push("/");
    }
  }, [logInDone]);

  // 이벤트 바인딩
  useEffect(() => {
    document.addEventListener("click", clickOutSideEvent);

    return () => {
      document.removeEventListener("click", clickOutSideEvent);
    };
  }, []);

  return (
    <div className='container_layer'>
      <div
        className='blog_layer'
        style={{
          position: "fixed",
          top: "50%",
          marginTop: "-227px",
          zIndex: 10,
        }}
      >
        <div className='inner_blog_layer inner_blog_layer5'>
          <form onSubmit={onSubmitForm}>
            <div className={modalClasses.paper}>
              <h2>로그인</h2>
              <FormControl>
                <TextField
                  id='id'
                  label='id'
                  onChange={onChangeId}
                  value={id}
                />
                <TextField
                  id='password'
                  label='password'
                  type='password'
                  onChange={onChangePassword}
                  value={password}
                />
                <br />
                <Button variant='contained' color='primary' type='submit'>
                  로그인
                </Button>
              </FormControl>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
