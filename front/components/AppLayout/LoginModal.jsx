import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormControl, TextField, Button } from "@material-ui/core";

import { modalStyles } from "../layout/LoginStyles";
import useInput from "../../hooks/useInput";

const LoginModal = () => {
  const dispatch = useDispatch();
  const modalClasses = modalStyles();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const logInLoading = useSelector((state) => state.user.logInLoading);
  const logInDone = useSelector((state) => state.user.logInDone);
  const logInError = useSelector((state) => state.user.logInError);

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
      dispatch({ type: "END_LOG_IN_MODE_ACTION" });
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
