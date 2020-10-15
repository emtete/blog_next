import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { menuStyles } from "../layout/styles";
import Common from "./Common";

const ManagerPage = ({ children }) => {
  const classes = menuStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const me = useSelector((state) => state.user.me);
  const loadMyInfoDone = useSelector((state) => state.user.loadMyInfoDone);

  // 새로고침 혹은 주소로 접근시 처리.
  useEffect(() => {
    if (loadMyInfoDone && !me) {
      router.push("/");
    }
  }, [loadMyInfoDone]);

  const handleRouter = (e, path) => {
    // if (router.pathname === "/newpost") {
    //   dispatch({ type: "REMOVE_ORG_POST_ACTION" });
    // }
    router.push(path);
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}

      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          <div>
            <div
              className={(classes.toolbar, classes.toolbarCustomising)}
              style={{ fontFamilly: "나눔고딕" }}
            >
              DEV LIFE
              <span
                className={classes.toolbarCustomising2}
                style={{ fontFamilly: "나눔고딕" }}
              >
                Front-End Web Developer
              </span>
            </div>
            <List>
              <Common />
              <ListItem
                button
                style={{ color: "#dbdfe2" }}
                onClick={(e) => handleRouter(e, "/manage/category")}
              >
                <ListItemText
                  primary='카테고리 관리'
                  style={{ paddingLeft: "20px", color: "#dbdfe2" }}
                />
              </ListItem>

              <ListItem
                button
                style={{ color: "#dbdfe2" }}
                onClick={(e) => handleRouter(e, "/manage/post")}
              >
                <ListItemText
                  primary='글관리'
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
