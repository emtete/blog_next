import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Hidden from "@material-ui/core/Hidden";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { menuStyles } from "./style/DrawerStyles";
import Common from "./Common";
import LayoutBar from "./LayoutBar";

const getIsArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const UserPage = ({ children }) => {
  const classes = menuStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuList, setMenuList] = useState([]);

  const isDrawer = useSelector((state) => state.post.isDrawer);
  const me = useSelector((state) => state.user.me);
  const treeData = useSelector((state) => state.category.treeData);

  const { getListLoading, getListDone, getListError } = useSelector(
    (state) => ({
      getListLoading: state.category.getListLoading,
      getListDone: state.category.getListDone,
      getListError: state.category.getListError,
    }),
    (prev, next) => {
      return (
        prev.getListLoading === next.getListLoading &&
        prev.getListDone === next.getListDone &&
        prev.getListError === next.getListError
      );
    }
  );

  const loadMyInfoDone = useSelector((state) => state.user.loadMyInfoDone);
  const loadMyInfoError = useSelector((state) => state.user.loadMyInfoError);

  useEffect(() => {
    const data = { userId: me ? me.id : 1 };
    dispatch({ type: "GET_CATEGORY_LIST_REQUEST", data });
  }, [loadMyInfoDone]);

  // 카테고리 리스트 호출
  useEffect(() => {
    //  성공
    if (getListDone) {
      setMenuList(deepCopy(treeData));
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
    }
    // 실패
    if (getListError) {
      alert(getListError);
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
    }
  }, [getListDone, getListError]);

  const onClickItem = useCallback(
    (e) => {
      if (!getIsArray(e.children)) {
        let path = e.isCard ? "cards" : "posts";
        if (e.id == 14) {
          router.push(`/post/25`);
          // if (e.id == 13) {
          //   router.push(`/post/29`);
        } else {
          router.push(`/${path}/${e.id}`, undefined, { shallow: true });
        }
      } else {
        onToggleMenu(e);
      }
    },
    [menuList]
  );

  const onToggleMenu = useCallback(
    (e) => {
      e.isOpend = !e.isOpend;
      setMenuList([...menuList]);
    },
    [menuList]
  );

  // const onClickTitle = useCallback(() => {
  //   router.push("/", undefined, { shallow: true });
  // }, []);

  console.log("UserPage");
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}

      <nav className={classes.drawer} aria-label='mailbox folders'>
        <LayoutBar />
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            // drawer
            // variant='permanent'
            variant='persistent'
            anchor='left'
            open={isDrawer}
          >
            <div>
              <div
                className={(classes.toolbar, classes.toolbarCustomising)}
                style={{
                  fontFamily:
                    "BlinkMacSystemFont, Apple SD Gothic Neo, Helvetica Neue,  나눔고딕",
                }}
              >
                <Link href='/' style={{ color: "#ffffff" }}>
                  <a>DEV LIFE</a>
                  {/* onClick={onClickTitle} */}
                </Link>
                <span
                  className={classes.toolbarCustomising2}
                  style={{
                    fontFamily:
                      "BlinkMacSystemFont, Apple SD Gothic Neo, Helvetica Neue,  나눔고딕",
                  }}
                >
                  Front-End Web Developer
                </span>
              </div>
              <List>
                <Common />

                {menuList.map((e, index) => (
                  <div key={e.id}>
                    <ListItem
                      button
                      key={e.id}
                      style={{ color: "#dbdfe2" }}
                      onClick={() => onClickItem(e)}
                    >
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
                              onClick={() => onClickItem(ee)}
                            >
                              <ListItemText
                                primary={ee.title}
                                style={{
                                  paddingLeft: "30px",
                                  color: "#dbdfe2",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </div>
                ))}
              </List>
            </div>
          </Drawer>
        </Hidden>
      </nav>
      {children}
    </div>
  );
};

export default UserPage;
