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
import Common from "./Common";

const ManagerPage = () => {
  const classes = menuStyles();

  const handleHandle = () => {
    // if (me) {
    //   dispatch(logoutRequestAction());
    // } else {
    //   handleOpen();
    // }
  };
  return (
    <div>
      <div className={(classes.toolbar, classes.toolbarCustomising)}>
        DEV LIFE
      </div>
      <List>
        <ListItem
          button
          style={{ color: "#dbdfe2" }}
          onClick={() => {
            router.push("/settings");
          }}
        >
          <ListItemIcon>
            <InboxIcon style={{ color: "#dbdfe2" }} />
          </ListItemIcon>
          <ListItemText primary='메뉴관리' style={{ color: "#dbdfe2" }} />
        </ListItem>

        <ListItem
          button
          style={{ color: "#dbdfe2" }}
          onClick={() => {
            router.push("/postManage");
          }}
        >
          <ListItemIcon>
            <InboxIcon style={{ color: "#dbdfe2" }} />
          </ListItemIcon>
          <ListItemText primary='글관리' style={{ color: "#dbdfe2" }} />
        </ListItem>

        <ListItem
          button
          style={{ color: "#dbdfe2" }}
          onClick={() => {
            router.push("/board");
          }}
        >
          <ListItemIcon>
            <InboxIcon style={{ color: "#dbdfe2" }} />
          </ListItemIcon>
          <ListItemText primary='글쓰기' style={{ color: "#dbdfe2" }} />
        </ListItem>
        <Common />
        {/* <Divider style={{ backgroundColor: "#ffffff" }} />
        <ListItem
          style={{ color: "#dbdfe2", justifyContent: "center" }}
          key='login'
        >
          <Button style={{ color: "#ffffff" }} onClick={handleHandle}>
            {me ? "로그아웃" : "로그인"}
          </Button>
          <IconButton
            style={{ color: "#ffffff" }}
            aria-label='upload picture'
            component='span'
            onClick={onHandleAdmim}
          >
            {isAdmin ? <PersonIcon /> : <SettingsIcon />}
          </IconButton>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
            >
              {body}
            </Modal>
          </div>
        </ListItem> */}
      </List>
    </div>
  );
};

export default ManagerPage;
