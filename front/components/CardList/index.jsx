import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CardNode from "./CardNode";
import CardModal from "./CardModal";

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

const CardList = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const query = router.query;

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
    const data = { CategoryId: query.categoryId, includeContent: true };
    dispatch({ type: "GET_POST_LIST_REQUEST", data });
  }, [query]);

  useEffect(() => {
    if (getListDone) dispatch({ type: "GET_POST_LIST_RESET" });
    if (getListError) alert(getListError);
  }, [getListDone, getListError]);

  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_cont'>
            리뷰 페이지
            <button className='link_write'>
              글 쓰기<span className='ico_blog'></span>
            </button>
          </h3>
          {/* <div className='wrap_set'> */}
          <Grid container spacing={2}>
            {items.map((post, i) => (
              <Grid
                key={post.id + post.title}
                item
                xs={4}
                justify='center'
                container
              >
                <CardNode post={post} />
              </Grid>
            ))}
          </Grid>
          {/* </div> */}
        </div>
      </div>
      {isViewMode && <CardModal />}
    </main>
  );
};

export default CardList;
