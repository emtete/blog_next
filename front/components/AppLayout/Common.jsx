import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Toolbar from "@material-ui/core/Toolbar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import { FormControl, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useCallback, useEffect } from "react";

import { modalStyles, getModalStyle } from "../layout/LoginStyles";
import { ToggleButton, menuStyles } from "../layout/styles";

import useInput from "../../hooks/useInput";
import LoginModal from "./LoginModal";

import Modal from "@material-ui/core/Modal";
import { useRouter } from "next/router";

const Common = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const me = useSelector((state) => state.user.me);
  const isLoginMode = useSelector((state) => state.user.isLoginMode);
  const isAdminMode = useSelector((state) => state.user.isAdminMode);

  const handleLogin = () => {
    if (me) {
      dispatch({ type: "LOG_OUT_REQUEST" });
      router.push("/");
    } else {
      dispatch({ type: "START_LOG_IN_MODE_ACTION" });
    }
  };

  const handleAdminMode = () => {
    if (isAdminMode) {
      dispatch({ type: "END_ADMIN_MODE_ACTION" });
    } else {
      dispatch({ type: "START_ADMIN_MODE_ACTION" });
    }
  };

  useEffect(() => {
    dispatch({ type: "LOAD_MY_INFO_REQUEST" });
  }, []);

  console.log("Common rendering");
  return (
    <>
      <Divider style={{ backgroundColor: "#ffffff" }} />
      <ListItem
        style={{ color: "#dbdfe2", justifyContent: "center" }}
        key='login'
      >
        <Button style={{ color: "#ffffff" }} onClick={handleLogin}>
          {me ? "로그아웃" : "로그인"}
        </Button>

        {me && (
          <Button style={{ color: "#ffffff" }} onClick={handleAdminMode}>
            {isAdminMode ? "사용자 페이지" : "관리자 페이지"}
          </Button>
        )}
        <div></div>
      </ListItem>
      {isLoginMode && <LoginModal />}
    </>
  );
};

export default Common;
