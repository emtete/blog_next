import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import TuiEditor from "../../TuiEditor";
import PostDetail from "./PostDetail";

// const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    paddingTop: "48px",
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
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const PostList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const tuiRef = useRef();

  const query = router.query;

  const isDrawer = useSelector((state) => state.post.isDrawer);
  const me = useSelector((state) => state.user.me);
  const { items, getListDone, getListError } = useSelector(
    (state) => ({
      items: state.post.item.items,
      getListDone: state.post.getListDone,
      getListError: state.post.getListError,
    }),
    (prev, next) => {
      return (
        prev.items === next.items &&
        prev.getListDone === next.getListDone &&
        prev.getListError === next.getListError
      );
    }
  );

  const [postList, setPostList] = useState([]);
  const [newPost, setNewPost] = useState();
  const [isEditMode, setIsEditMode] = useState(null);

  // 글 목록 호출
  // useEffect(() => {
  //   const data = {
  //     userId: me ? me.id : 1,
  //     CategoryId: query.categoryId,
  //     includeContent: true,
  //   };
  //   dispatch({ type: "GET_POST_LIST_REQUEST", data });
  // }, [query, me]);
  useEffect(() => {
    setIsEditMode(null);
    if (window.innerWidth < 600) {
      const data = { isDrawer: false };
      dispatch({ type: "SET_TOGGLE_IS_DRAWER_ACTION", data });
    }
  }, [query.categoryId]);

  useEffect(() => {
    if (getListDone) {
      setPostList([...items]);
      setIsEditMode(null);
      dispatch({ type: "GET_POST_LIST_RESET" });
    }
    if (getListError) alert(getListError);
  }, [getListDone, getListError]);

  const onClickWrite = useCallback(() => {
    if (isEditMode === null) {
      const newPost = { title: "", content: "", date: "", id: "" };
      const clone = deepCopy(postList);
      clone.push(newPost);
      setPostList([...clone]);
      setIsEditMode(postList.length + 1);
    } else {
      const clone = deepCopy(postList);
      clone.splice(isEditMode - 1, 1);
      setPostList([...clone]);
      setIsEditMode(null);
    }
  }, [isEditMode, postList]);

  return (
    // <main className={classes.content}>
    <main //className={`${classes.content} inner_layout_bar`}
      className={clsx(classes.content1, {
        [classes.contentShift]: isDrawer,
      })}
    >
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_cont'>
            {query.categoryName}
            {me && (
              <button className='link_write' onClick={onClickWrite}>
                {isEditMode ? "취소" : "글 쓰기"}
                <span className='ico_blog'></span>
              </button>
            )}
          </h3>
          <div>
            {postList.map((post, i) => (
              <PostDetail
                post={post}
                key={String(post.id) + String(post.date)}
                CategoryId={query.categoryId}
                categoryName={query.categoryName}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostList;
