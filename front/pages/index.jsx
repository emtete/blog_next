import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Link from "next/link";
import RemoveMarkdown from "remove-markdown";
import { backUrl } from "../config/config";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  media: {
    paddingTop: "50%",
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

const changeDateFormat = (dateStr) => {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y} / ${m} / ${d}`;
};

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Home = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const me = useSelector((state) => state.user.me);
  const isDrawer = useSelector((state) => state.post.isDrawer);
  const loadMyInfoDone = useSelector((state) => state.user.loadMyInfoDone);
  const loadMyInfoError = useSelector((state) => state.user.loadMyInfoError);

  const [postList, setPostList] = useState(props.data || null);
  const [hasMorePosts, setHasMorePosts] = useState(props.data.length === 10);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [numberOfRequest, setNumberOfRequest] = useState(postList ? 1 : 0);

  const url = `${backUrl}post/getScrollList?userId=${
    me ? me.id : 1
  }&numberOfRequest=${numberOfRequest * 10}`;

  function getFirstList() {
    axios
      .get(`${backUrl}post/getScrollList?userId=${me ? me.id : 1}`, {
        withCredentials: true,
      })
      .then((result) => {
        setPostList(result.data);
        setNumberOfRequest(1);
        setHasMorePosts(result.data.length === 10);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const getScrollList = useCallback(() => {
    setIsLoading(true);
    axios
      .get(url, { withCredentials: true })
      .then((result) => {
        setIsLoading(false);
        const data = result.data;
        if (postList) {
          setPostList((prev) => prev.concat(data));
        } else {
          setPostList(data);
        }
        setNumberOfRequest((prev) => prev + 1);
        setHasMorePosts(data.length === 10);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err);
      });
  }, [isLoading, postList, me, url]); //hasMorePosts

  const onScroll = useCallback(() => {
    const upperIndex = window.pageYOffset;
    const screenHeight = document.documentElement.clientHeight;
    const entireHeight = document.documentElement.scrollHeight;
    const searchCondition = upperIndex + screenHeight > entireHeight - 300;

    if (!isLoading && searchCondition && hasMorePosts) {
      getScrollList();
    }
  }, [getScrollList, isLoading, hasMorePosts, numberOfRequest]); //hasMorePosts

  // 로그인 정보가 변경되는 경우
  useEffect(() => {
    // console.log(postList);
    if (loadMyInfoDone && !isFirst) {
      getFirstList();
    }
    setIsFirst(false);
  }, [me?.id]); // isChanged

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <>
      <Head>
        <title>DEV LIFE</title>
        <meta name='description' content={"웹 개발 블로그입니다."} />
        <meta property='og:title' content={"DEV LIFE"} />
        <meta property='og:description' content={"웹 개발 블로그입니다."} />
        <meta property='og:image' content={"https://i.imgur.com/OCGRjWh.png"} />
        <meta property='og:url' content={"https://dev-life.kr"} />
      </Head>
      <main
        className={clsx(classes.content1, {
          [classes.contentShift]: isDrawer,
        })}
        style={{ width: "100%" }}
      >
        <div>
          {postList &&
            postList.map((post) => (
              <div
                key={post.id + post.title}
                style={{ width: "820px", margin: "0 auto" }}
              >
                <div
                  style={{
                    padding: "35px 0",
                    borderBottom: "1px solid #ebebeb",
                  }}
                >
                  <Link
                    href={`/post/${post.id}`}
                    style={{
                      display: "block",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    <a style={{ color: "black" }}>
                      <strong
                        // class='tit_post'
                        style={{
                          display: "block",
                          fontWeight: "normal",
                          fontSize: "28px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {post.title}
                      </strong>
                      <p
                        // class='txt_post'
                        style={{
                          display: "-webkit-box",
                          display: "-ms-flexbox",
                          display: "box",
                          overflow: "hidden",
                          maxHeight: "80px",
                          marginTop: "1px",
                          fontSize: "16px",
                          lineHeight: "28px",
                          color: "#666",
                          verticalAlign: "top",
                          wordBreak: "break-all",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                        }}
                      >
                        {RemoveMarkdown(post.content)}
                      </p>
                    </a>
                  </Link>
                  <div
                    // class='detail_info'
                    style={{
                      marginTop: "16px",
                      fontSize: "12px",
                      color: "#aaa",
                    }}
                  >
                    <a
                      href='/'
                      // class='link_cate'
                      style={{
                        fontSize: "12px",
                        textDecoration: "none",
                        // color: "#3db39e",
                        color: "#556cd6",
                      }}
                    >
                      {post.categoryName}
                    </a>
                    <span
                      // class='txt_bar'
                      style={{
                        display: "inline-block",
                        width: "1px",
                        height: "9px",
                        margin: "0 5px",
                        backgroundColor: "#ebebeb",
                      }}
                    ></span>
                    {changeDateFormat(post.createdAt)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const cookieArr = cookie && cookie.split("; ");
    let cookieObj = {};
    for (let i in cookieArr) {
      cookieObj[cookieArr[i].split("=")[0]] = cookieArr[i].split("=")[1];
    }

    // const data = {
    const userId = cookieObj.id || 1;
    //   CategoryId: context.query.categoryId,
    //   includeContent: true,
    // };

    // const id = context.req.url.split("/")[2];
    const data = await fetcher(
      // `${backUrl}post/getScrollList?userId=${userId}&includeContent=${true}&isNotice=${1}`
      `${backUrl}post/getScrollList?userId=${userId}`
    );

    context.store.dispatch({ type: "LOAD_MY_INFO_REQUEST" });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    return { props: { data } };
  }
);

export default Home;
