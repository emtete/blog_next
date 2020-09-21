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
import { FormControl, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { modalStyles, getModalStyle } from "../layout/LoginStyles";
import { ToggleButton, menuStyles } from "../layout/styles";

import useInput from "../../hooks/useInput";
import Common from "./Common";

const getIsArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const UserPage = ({ children }) => {
  const classes = menuStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const treeData = useSelector((state) => state.category.treeData);
  const [menuList, setMenuList] = useState([]);

  const getListLoading = useSelector((state) => state.category.getListLoading);
  const getListDone = useSelector((state) => state.category.getListDone);
  const getListError = useSelector((state) => state.category.getListError);

  const loadMyInfoLoading = useSelector(
    (state) => state.user.loadMyInfoLoading
  );
  const loadMyInfoDone = useSelector((state) => state.user.loadMyInfoDone);
  const loadMyInfoError = useSelector((state) => state.user.loadMyInfoError);

  const logOutDone = useSelector((state) => state.user.logOutDone);

  const onToggleMenu = (e) => {
    e.isOpend = !e.isOpend;
    setMenuList([...menuList]);
  };

  // useEffect(() => {`
  //   if (loadMyInfoDone) {
  //     dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
  //   }
  //   if (logOutDone) {
  //     dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
  //     dispatch({ type: "LOG_OUT_RESET" });
  //   }
  // }, [loadMyInfoDone, logO`utDone]);

  useEffect(() => {
    dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
  }, []);

  // 카테고리 리스트 호출 성공.
  useEffect(() => {
    if (getListDone) {
      setMenuList(deepCopy(treeData));
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
    }
  }, [getListDone]);

  // 카테고리 리스트 호출 중 에러.
  useEffect(() => {
    if (getListError) {
      alert(getListError);
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
    }
  }, [getListError]);

  console.log("UserPage rendering");
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
            </div>
            <List>
              {menuList.map((e, index) => (
                <div key={e.id}>
                  <ListItem
                    button
                    key={e.id}
                    style={{ color: "#dbdfe2" }}
                    onClick={() => {
                      !getIsArray(e.children)
                        ? router.push(`/post?categoryId=${e.id}`)
                        : onToggleMenu(e);
                    }}
                  >
                    {/* <ListItemIcon>
                      {index % 2 === 0 ? (
                        <InboxIcon style={{ color: "#dbdfe2" }} />
                      ) : (
                        <MailIcon style={{ color: "#dbdfe2" }} />
                      )}
                    </ListItemIcon> */}
                    <ListItemText
                      primary={e.title}
                      style={{ paddingLeft: "20px", color: "#dbdfe2" }}
                    />
                    {Array.isArray(e.children) && e.children.length > 0 ? (
                      e.isOpend ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItem>
                  {Array.isArray(e.children) && e.children.length > 0 && (
                    <Collapse in={e.isOpend} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        {e.children.map((ee, iindex) => (
                          <ListItem
                            key={ee.id}
                            button
                            className={classes.nested}
                            style={{ color: "#dbdfe2" }}
                            onClick={() => {
                              router.push(`/post?categoryId=${ee.id}`);
                            }}
                          >
                            {/* <ListItemIcon>
                              <MailIcon style={{ color: "#dbdfe2" }} />
                            </ListItemIcon> */}
                            <ListItemText
                              primary={ee.title}
                              style={{ paddingLeft: "30px", color: "#dbdfe2" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
              <Common />
            </List>
          </div>
        </Drawer>
      </nav>
      {children}
    </div>
  );
};

export default UserPage;
