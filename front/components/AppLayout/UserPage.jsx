import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

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

  // console.log("treeData", treeData);
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

  // useEffect(() => {
  // setMenuList(deepCopy(treeData));
  // }, [treeData]);

  useEffect(() => {
    const data = { userId: me ? me.id : 1 };
    dispatch({ type: "GET_CATEGORY_LIST_REQUEST", data });
  }, [loadMyInfoDone]);

  // useEffect(() => {
  //   const data = { userId: me ? me.id : 1 };
  //   dispatch({ type: "GET_CATEGORY_LIST_REQUEST", data });
  // }, [me]);

  // 카테고리 리스트 호출
  useEffect(() => {
    //  성공
    if (getListDone) {
      setMenuList(deepCopy(treeData));
      // console.log("treeData", treeData);
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
        // router.push(
        //   `/${e.isCard ? "cards" : "posts"}?categoryId=${e.id}&categoryName=${
        //     e.title
        //   }`
        // );
        let path = e.isCard ? "cards" : "posts";
        if (e.id == 14) {
          router.push(`/post/25`);
          // if (e.id == 13) {
          //   router.push(`/post/29`);
        } else {
          router.push(`/${path}/${e.id}`);
        }
        // router.push(`/${path}?id=${e.id}`);
      } else {
        onToggleMenu(e);
      }
    },
    [menuList]
  );

  const onToggleMenu = (e) => {
    e.isOpend = !e.isOpend;
    setMenuList([...menuList]);
  };

  console.log("UserPage");
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}

      <nav className={classes.drawer} aria-label='mailbox folders'>
        <LayoutBar />
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
      </nav>
      {children}
    </div>
  );
};

export default UserPage;
