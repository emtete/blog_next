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

  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const isAdminMode = useSelector((state) => state.user.isAdminMode);
  const menu = useSelector((state) => state.menu.node.children);
  const [menuList, setMenuList] = React.useState(menu);

  const router = useRouter();

  useEffect(() => {
    dispatch(resetIndexPathAction());
    dispatch({
      type: "LOAD_MY_INFO_REQUEST",
    });
  }, []);

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
            {isAdminMode ? <ManagerPage /> : <UserPage menuList={menuList} />}
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
