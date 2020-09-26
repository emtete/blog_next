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

import { menuStyles } from "../layout/styles";
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

  const onClickItem = useCallback(
    (e) => {
      !getIsArray(e.children)
        ? router.push(`/${e.isCard ? "card" : "post"}?categoryId=${e.id}`)
        : onToggleMenu(e);
    },
    [menuList]
  );

  console.log("UserPage rendering");
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
                key='card'
                style={{ color: "#dbdfe2" }}
                onClick={() => {
                  router.push(`/card`);
                }}
              >
                <ListItemText
                  primary='Card'
                  style={{ paddingLeft: "20px", color: "#dbdfe2" }}
                />
              </ListItem>

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
                            onClick={
                              () => onClickItem(ee)
                              //   {
                              //   router.push(`/post?categoryId=${ee.id}`);
                              // }
                            }
                          >
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
            </List>
          </div>
        </Drawer>
      </nav>
      {children}
    </div>
  );
};

export default UserPage;
