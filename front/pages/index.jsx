import { useEffect, useState } from "react";
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
  const me = useSelector((state) => state.user.me);
  const isDrawer = useSelector((state) => state.post.isDrawer);

  const { data: postList, err } = useSWR(
    // `${backUrl}post/getList?userId=${me ? me.id : 1}`
    `${backUrl}post/getList?userId=${me ? me.id : 1}&includeContent=${true}`,
    fetcher,
    props.data
  );

  console.log(postList);
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
                    href={`http://localhost:3000/post/${post.id}`}
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
                        color: "#3db39e",
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
      `${backUrl}post/getList?userId=${userId}&includeContent=${true}`
    );

    context.store.dispatch({ type: "LOAD_MY_INFO_REQUEST" });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    return { props: { data } };
  }
);

export default Home;
