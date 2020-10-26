import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import Head from "next/head";
import RemoveMarkdown from "remove-markdown";

import { makeStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";
import clsx from "clsx";

import useSWR from "swr";
import axios from "axios";

import TuiEditor from "../../components/TuiEditor";
import wrapper from "../../store/configureStore";
import { backUrl } from "../../config/config";

const changeDateFormat = (dateStr) => {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y} / ${m} / ${d}`;
};

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

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Card = (props) => {
  const classes = useStyles();
  const tuiRef = useRef();
  const router = useRouter();

  const query = router.query;
  const [post, setPost] = useState(props.data);

  // const { data: post, err } = useSWR(
  //   `${backUrl}post/getOne?id=${query.id}`,
  //   fetcher,
  //   props.data
  // );
  useEffect(() => {
    !props.data &&
      axios
        .get(`${backUrl}post/getOne?id=${query.id}`, {
          withCredentials: true,
        })
        .then((result) => {
          setPost(result.data);
        })
        .catch((err) => {
          alert(err);
        });
  }, [props.data]);

  const isDrawer = useSelector((state) => state.post.isDrawer);
  // console.log("post : ", RemoveMarkdown(post.content));
  // useEffect(() => {
  //   setPost(data);
  // }, [data]);

  // useEffect(() => {
  //   !post &&
  //     axios
  //       .get(`${backUrl}post/getOne?id=${query.id}`, { withCredentials: true })
  //       .then((result) => {
  //         setPost(result.data);
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   // setRerender(false);
  // }, [query.id]);

  return (
    <>
      <Head>
        <title>DEV LIFE</title>
        {post && (
          <>
            <meta
              name='description'
              content={RemoveMarkdown(post.content) || ""}
            />
            <meta property='og:title' content={post.title || ""} />
            <meta
              property='og:description'
              content={RemoveMarkdown(post.content) || ""}
            />
            <meta
              property='og:image'
              content={post.imagePath || "https://i.imgur.com/OCGRjWh.png"}
            />
            <meta
              property='og:url'
              content={`${backUrl}post/${query.id}` || ""}
            />
          </>
        )}
      </Head>

      <main
        className={clsx(classes.content1, {
          [classes.contentShift]: isDrawer,
        })}
        style={{ width: "100%" }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <form className='page_card_layer'>
            <div style={{ padding: "30px 30px 10px" }}>
              <div>
                <h1
                  style={{
                    display: "inline",
                  }}
                >
                  {post && post.title}
                </h1>
              </div>

              <div
                style={{
                  paddingTop: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {post ? `작성일 : ${changeDateFormat(post.createdAt)}` : ""}
                </span>
              </div>
            </div>
            {post && post.imagePath && (
              <CardMedia
                className={classes.media}
                image={post.imagePath}
                title='Contemplative Reptile'
              />
            )}
            {/* "https://i.imgur.com/qHh3uir.png" */}
            <div style={{ padding: "30px" }}>
              {post && post.content && (
                <TuiEditor
                  isEditorMode={false}
                  tuiRef={tuiRef}
                  initialContent={post.content}
                />
              )}
            </div>
          </form>
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

    const id = context.req.url.split("/")[2];
    const data = await fetcher(`${backUrl}post/getOne?id=${id}`);

    context.store.dispatch({ type: "LOAD_MY_INFO_REQUEST" });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    return { props: { data } };
  }
);

export default Card;
