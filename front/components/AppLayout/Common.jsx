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

import { modalStyles, getModalStyle } from "../layout/LoginStyles";
import { ToggleButton, menuStyles } from "../layout/styles";
import {
  loginRequestAction,
  logoutRequestAction,
  startLogInModeAction,
  endLogInModeAction,
  startAdminModeAction,
  endAdminModeAction,
} from "../../reducers/user";
import { resetIndexPathAction } from "../../reducers/category";
import useInput from "../../hooks/useInput";
import LoginModal from "./LoginModal";

import Modal from "@material-ui/core/Modal";

const Common = () => {
  const dispatch = useDispatch();
  const {
    //logInError,
    isAdminMode,
    me,
    isLoginMode,
  } = useSelector((state) => state.user);

  const handleLogin = () => {
    if (me) {
      dispatch(logoutRequestAction());
    } else {
      // handleOpen();
      dispatch(startLogInModeAction());
    }
  };

  const handleManageMode = () => {
    if (isAdminMode) {
      dispatch(endAdminModeAction());
    } else {
      dispatch(startAdminModeAction());
    }
  };

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
          <Button style={{ color: "#ffffff" }} onClick={handleManageMode}>
            {isAdminMode ? "사용자 페이지" : "관리자 페이지"}
          </Button>
        )}
        {/* <IconButton
          style={{ color: "#ffffff" }}
          aria-label='upload picture'
          component='span'
          // onClick={onHandleAdmim}
        >
          {me ? <PersonIcon /> : <SettingsIcon />}
        </IconButton> */}
        <div>
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            {body}
          </Modal> */}
        </div>
      </ListItem>
      {isLoginMode && <LoginModal />}
    </>
  );
};

export default Common;
