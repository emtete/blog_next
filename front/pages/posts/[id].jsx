import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";

import { backUrl } from "../../config/config";
import PostDetail from "../../components/user/PostList/PostDetail";

const drawerWidth = 290;

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
    width: "100%",
    paddingTop: "80px",
    flexGrow: 1,
    padding: theme.spacing(3),
    // marginLeft: drawerWidth,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      // width: drawerWidth,
      // flexShrink: 0,
    },
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
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

const Post = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const tuiRef = useRef();

  const query = router.query;

  const isDrawer = useSelector((state) => state.post.isDrawer);
  const me = useSelector((state) => state.user.me);

  const [postList, setPostList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isEditMode, setIsEditMode] = useState(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    query.id &&
      axios
        .get(
          `${backUrl}post/getListCategory?CategoryId=${query.id}&userId=${
            me ? me.id : 1
          }&includeContent=${true}`,
          { withCredentials: true }
        )
        .then((result) => {
          setPostList(result.data[0]);
          setCategoryName(result.data[1]);
          // result.data[0] && setCategoryName(result.data[0].categoryName);
        })
        .catch((err) => {
          alert(err);
        });
    setRerender(false);
  }, [query.id, me, rerender]);

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
    <>
      <main className={classes.content1}>
        <div id='mArticle'>
          <div className='blog_category'>
            <h3 className='tit_cont'>
              {categoryName}
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
                  CategoryId={query.id}
                  categoryName={categoryName}
                  setRerender={setRerender}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Post;
