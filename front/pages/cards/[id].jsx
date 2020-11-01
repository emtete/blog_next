import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// import useSWR from "swr";
import axios from "axios";

import CardNode from "../../components/user/CardList/CardNode";
import CardModal from "../../components/user/CardList/CardModal";
import { backUrl } from "../../config/config";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
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

const getIsArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

const Cards = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const query = router.query;

  const isDrawer = useSelector((state) => state.post.isDrawer);
  const me = useSelector((state) => state.user.me);
  const isViewMode = useSelector((state) => state.post.isViewMode);

  const [items, setItems] = useState([]);
  const [url, setUrl] = useState(
    `${backUrl}post/getList?CategoryId=${query.id}&userId=${
      me ? me.id : 1
    }&includeContent=${true}`
  );
  const [categoryName, setCategoryName] = useState("");
  const [rerender, setRerender] = useState(false);
  // console.log(query.id);
  useEffect(() => {
    query.id &&
      axios
        .get(url, { withCredentials: true })
        .then((result) => {
          setItems(result.data);
          result.data[0] && setCategoryName(result.data[0].categoryName);
        })
        .catch((err) => {
          alert(err);
        });
    setRerender(false);
  }, [query.id, rerender]);

  // useEffect(() => {
  //   if (window.innerWidth < 600) {
  //     const data = { isDrawer: false };
  //     dispatch({ type: "SET_TOGGLE_IS_DRAWER_ACTION", data });
  //   }
  // }, [query.id]);

  const onClickWrite = useCallback(() => {
    dispatch({ type: "START_IS_VIEW_MODE_ACTION" });
  }, []);

  return (
    <>
      {/* <UserPage /> */}
      <main
        className={
          // clsx(
          classes.content1
          //     , {
          //   [classes.contentShift]: isDrawer,
          // })
        }
      >
        <div id='mArticle'>
          <div className='blog_category'>
            <h3 className='tit_cont'>
              {categoryName}
              {me && (
                <button className='link_write' onClick={onClickWrite}>
                  글 쓰기<span className='ico_blog'></span>
                </button>
              )}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
              {items &&
                items.map((post, i) => (
                  <CardNode post={post} key={post.id + post.title} />
                ))}
            </div>
          </div>
        </div>
        {isViewMode && (
          <CardModal
            categoryId={query.id}
            categoryName={categoryName ? categoryName : ""}
            setRerender={setRerender}
          />
        )}
      </main>
    </>
  );
};

export default Cards;
