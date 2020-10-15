import { useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useSWR from "swr";

import { makeStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";
import clsx from "clsx";

import TuiEditor from "../../components/TuiEditor";

import { backUrl } from "../../config/config";
import Axios from "axios";

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
  Axios.get(url, { withCredentials: true }).then((result) => result.data);

const Card = () => {
  const classes = useStyles();
  const tuiRef = useRef();
  const router = useRouter();

  const query = router.query;

  const { data: post, err } = useSWR(
    `${backUrl}post/getOne?id=${query.id}`,
    fetcher
  );
  const isDrawer = useSelector((state) => state.post.isDrawer);

  return (
    <main
      className={clsx(classes.content1, {
        [classes.contentShift]: isDrawer,
      })}
      style={{ width: "100%" }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
            <TuiEditor
              isEditorMode={false}
              tuiRef={tuiRef}
              initialContent={post ? post.content : ""}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Card;
