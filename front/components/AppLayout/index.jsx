import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useMemo, useCallback, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { FormControl, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { modalStyles, getModalStyle } from "../layout/LoginStyles";
import { ToggleButton, menuStyles } from "../layout/styles";
import { loginRequestAction, logoutRequestAction } from "../../reducers/user";
import { resetIndexPathAction } from "../../reducers/category";
import useInput from "../../hooks/useInput";
import UserPage from "./UserPage";
import ManagerPage from "./ManagerPage";
import LoginModal from "./LoginModal";

const AppLayout = ({ children, window }) => {
  const classes = menuStyles();
  const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const dispatch = useDispatch();
  const {
    //logInError,
    me,
    isLoginMode,
  } = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu.node.children);
  const [menuList, setMenuList] = React.useState(menu);

  const router = useRouter();

  useEffect(() => {
    dispatch(resetIndexPathAction());
    dispatch({
      type: "LOAD_MY_INFO_REQUEST",
    });
  }, []);

  // useEffect(() => {
  //   if (logInError) {
  //     alert(logInError);
  //   }
  // }, [logInError]);

  // const onToggleMenu = (e) => {
  //   e.isExpand = !e.isExpand;
  //   setMenuList([...menuList]);
  // };

  // modal start---
  // const modalClasses = modalStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  // const [open, setOpen] = React.useState(false);
  // const [id, onChangeId] = useInput("");
  // const [password, onChangePassword] = useInput("");

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleHandle = () => {
  //   if (me) {
  //     dispatch(logoutRequestAction());
  //   } else {
  //     handleOpen();
  //   }
  // };

  // const onSubmitForm = (e) => {
  //   e.preventDefault();
  //   dispatch(loginRequestAction({ email: id, password }));
  //   handleClose();
  // };

  // const body = (
  //   <div style={modalStyle} className={modalClasses.paper}>
  //     <h2 id='simple-modal-title'>로그인</h2>
  //     <form
  //       onSubmit={onSubmitForm}
  //       className={classes.root}
  //       noValidate
  //       autoComplete='off'
  //     >
  //       <FormControl>
  //         <TextField id='id' label='id' onChange={onChangeId} />
  //         <TextField id='id' label='password' onChange={onChangePassword} />
  //         <br />
  //         <Button variant='contained' color='primary' type='submit'>
  //           로그인
  //         </Button>
  //       </FormControl>
  //     </form>
  //   </div>
  // );
  // modal end---

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  console.log("AppLayout rendering");

  return (
    <div className={classes.root}>
      <CssBaseline />

      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* <Hidden smUp implementation='css'>
          <ToggleButton onClick={handleDrawerToggle}>
            {mobileOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ToggleButton>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === "rtl" ? "right" : "top"} // 메뉴가 위에서 나오도록..
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperMobile,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {me ? <ManagerPage /> : <UserPage menuList={menuList} />}
          </Drawer>
        </Hidden> */}
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {me ? <ManagerPage /> : <UserPage menuList={menuList} />}
          </Drawer>
        </Hidden>
      </nav>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: PropTypes.node.isRequired,
  window: PropTypes.func,
};

export default AppLayout;
