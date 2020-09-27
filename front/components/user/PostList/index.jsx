import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";

import TuiEditor from "../../TuiEditor";
import PostDetail from "./PostDetail";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    paddingTop: "48px",
    paddingLeft: "30px",
    paddingRight: "30px",
    backgroundColor: "#f3f5f7",
  },
}));

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export default function PostList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const tuiRef = useRef();

  const query = router.query;

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
  useEffect(() => {
    const data = { CategoryId: query.categoryId, includeContent: true };
    dispatch({ type: "GET_POST_LIST_REQUEST", data });
  }, [query]);

  useEffect(() => {
    if (getListDone) {
      console.log(1111);
      setPostList([...items]);
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
      setIsEditMode(postList.length);
      // console.log(isEditMode);
    } else {
      const clone = deepCopy(postList);
      clone.splice(isEditMode, 1);
      setPostList([...clone]);
      setIsEditMode(null);
    }
  }, [isEditMode, postList]);

  console.log("PostList rendering");
  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_cont'>
            리뷰 페이지
            <button className='link_write' onClick={onClickWrite}>
              {isEditMode ? "취소" : "글 쓰기"}
              <span className='ico_blog'></span>
            </button>
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
}
