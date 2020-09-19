import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import useInput from "../../hooks/useInput";
import Common from "./Common";

import Modal from "@material-ui/core/Modal";

const getIsArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const UserPage = () => {
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

  useEffect(() => {
    if (loadMyInfoDone) {
      dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
    }
    if (logOutDone) {
      dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
      dispatch({ type: "LOG_OUT_RESET" });
    }
  }, [loadMyInfoDone, logOutDone]);

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
                e.href ? router.push("/") : onToggleMenu(e);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon style={{ color: "#dbdfe2" }} />
                ) : (
                  <MailIcon style={{ color: "#dbdfe2" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={e.title} style={{ color: "#dbdfe2" }} />
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
                      // onClick={() => {
                      //   ee.href ? router.push("") : console.log(2);
                      // }}
                    >
                      <ListItemIcon>
                        <MailIcon style={{ color: "#dbdfe2" }} />
                      </ListItemIcon>
                      <ListItemText primary={ee.title} />
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
  );
};

export default UserPage;
