import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import ListItem from "@material-ui/core/ListItem";
import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import useInput from "../../hooks/useInput";
import LoginModal from "./LoginModal";

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
}

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

const Common = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isManage, setIsManage] = useState(false);

  const me = useSelector((state) => state.user.me);
  const isLoginMode = useSelector((state) => state.user.isLoginMode);
  // const isAdminMode = useSelector((state) => state.user.isAdminMode);

  const loadMyInfoDone = useSelector((state) => state.user.loadMyInfoDone);
  const loadMyInfoError = useSelector((state) => state.user.loadMyInfoError);

  const orgPost = useSelector((state) => state.post.orgPost);

  useEffect(() => {
    setIsManage(router.pathname.split("/")[1] === "manage");
  }, [router.pathname]);

  useEffect(() => {
    dispatch({ type: "LOAD_MY_INFO_REQUEST" });
  }, []);

  useEffect(() => {
    if (loadMyInfoDone) dispatch({ type: "LOAD_MY_INFO_RESET" });
    if (loadMyInfoError) alert(loadMyInfoError);
  }, [loadMyInfoDone, loadMyInfoError]);

  const handleLogin = () => {
    if (me) {
      const data = { userId: 1 };
      dispatch({ type: "GET_CATEGORY_LIST_REQUEST", data });
      dispatch({ type: "LOG_OUT_REQUEST" });
      Cookies.remove("id");
      router.push("/");
    } else {
      dispatch({ type: "START_LOG_IN_MODE_ACTION" });
    }
  };

  const handleAdminMode = () => {
    if (isManage) {
      // dispatch({ type: "END_ADMIN_MODE_ACTION" });
      router.push("/");
    } else {
      // dispatch({ type: "START_ADMIN_MODE_ACTION" });
      router.push("/manage/category");
    }
  };

  return (
    <>
      <ListItem
        style={{ color: "#dbdfe2", justifyContent: "center" }}
        key='login'
      >
        <Button style={{ color: "#ffffff" }} onClick={handleLogin}>
          {me ? "로그아웃" : "로그인"}
        </Button>

        {me && (
          <Button style={{ color: "#ffffff" }} onClick={handleAdminMode}>
            {isManage ? "사용자 페이지" : "관리자 페이지"}
          </Button>
        )}
        <div></div>
      </ListItem>
      {isLoginMode && <LoginModal />}
    </>
  );
};

export default Common;
