import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

import CardNode from "./CardNode";
import CardModal from "./CardModal";
import { useCallback } from "react";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    // paddingTop: "48px",
    paddingLeft: "30px",
    paddingRight: "30px",
    backgroundColor: "#f3f5f7",
  },
  content1: {
    paddingTop: "80px",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const getIsArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

const CardList = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const query = router.query;

  const isDrawer = useSelector((state) => state.post.isDrawer);
  const me = useSelector((state) => state.user.me);
  const { items, isViewMode, getListDone, getListError } = useSelector(
    (state) => ({
      items: state.post.item.items,
      isViewMode: state.post.isViewMode,
      getListDone: state.post.getListDone,
      getListError: state.post.getListError,
    }),
    (prev, next) => {
      return (
        next.items === prev.items &&
        next.isViewMode === prev.isViewMode &&
        next.getListDone === prev.getListDone &&
        next.getListError === prev.getListError
      );
    }
  );

  // 글 목록 호출
  useEffect(() => {
    const data = {
      // CategoryId: query.categoryId,
      CategoryId: query.id,
      includeContent: true,
      userId: me ? me.id : 1,
    };
    dispatch({ type: "GET_POST_LIST_REQUEST", data });
  }, [query, me]);

  useEffect(() => {
    if (window.innerWidth < 600) {
      const data = { isDrawer: false };
      dispatch({ type: "SET_TOGGLE_IS_DRAWER_ACTION", data });
    }
    // }, [query.categoryId]);
  }, [query.id]);

  useEffect(() => {
    if (getListDone) dispatch({ type: "GET_POST_LIST_RESET" });
    if (getListError) alert(getListError);
  }, [getListDone, getListError]);

  const onClickWrite = useCallback(() => {
    dispatch({ type: "START_IS_VIEW_MODE_ACTION" });
  }, []);

  return (
    <main //className={`${classes.content} inner_layout_bar`}
      className={clsx(classes.content1, {
        [classes.contentShift]: isDrawer,
      })}
    >
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_cont'>
            {/* {query.categoryName} */}
            {items && items[0] && items[0].categoryName}
            {me && (
              <button className='link_write' onClick={onClickWrite}>
                글 쓰기<span className='ico_blog'></span>
              </button>
            )}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            {/* <Grid container spacing={2}> */}
            {items.map((post, i) => (
              // <Grid
              //   key={post.id + post.title}
              //   item
              //   xs={3}
              //   spacing={1}
              //   // justify='center'
              //   container
              //   zeroMinWidth={true}
              // >
              <CardNode post={post} key={post.id + post.title} />
              // </Grid>
            ))}
            {/* </Grid> */}
          </div>
        </div>
      </div>
      {isViewMode && (
        <CardModal
          // categoryId={query.categoryId}
          categoryId={query.id}
          categoryName={items[0] ? items[0].categoryName : ""}
        />
      )}
    </main>
  );
};

export default CardList;
