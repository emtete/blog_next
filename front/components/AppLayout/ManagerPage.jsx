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
import useInput from "../../hooks/useInput";
import Common from "./Common";

const ManagerPage = ({ children }) => {
  const classes = menuStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRouter = (e, path) => {
    if (router.pathname === "/newpost") {
      dispatch({ type: "REMOVE_ORG_POST_ACTION" });
    }
    router.push(path);
  };

  console.log("ManagerPage rendering");
  return (
    <div className={classes.root}>
      <CssBaseline />

      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          <div>
            <div className={(classes.toolbar, classes.toolbarCustomising)}>
              DEV LIFE
              <span className={classes.toolbarCustomising2}>
                Front-End Web Developer
              </span>
            </div>
            <List>
              <Common />
              <ListItem
                button
                style={{ color: "#dbdfe2" }}
                onClick={(e) => handleRouter(e, "/category")}
              >
                <ListItemText
                  primary='카테고리 관리'
                  style={{ paddingLeft: "20px", color: "#dbdfe2" }}
                />
              </ListItem>

              <ListItem
                button
                style={{ color: "#dbdfe2" }}
                onClick={(e) => handleRouter(e, "/postManage")}
              >
                <ListItemText
                  primary='글관리'
                  style={{ paddingLeft: "20px", color: "#dbdfe2" }}
                />
              </ListItem>

              <ListItem
                button
                style={{ color: "#dbdfe2" }}
                onClick={(e) => handleRouter(e, "/newpost")}
              >
                <ListItemText
                  primary='글쓰기'
                  style={{ paddingLeft: "20px", color: "#dbdfe2" }}
                />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </nav>
      {children}
    </div>
  );
};

export default ManagerPage;
