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
    padding: theme.spacing(3),
  },
}));

const CardList = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const query = router.query;

  const isViewMode = useSelector((state) => state.post.isViewMode);
  const items = useSelector((state) => state.post.item.items);

  const getListDone = useSelector((state) => state.post.getListDone);
  const getListError = useSelector((state) => state.post.getListError);

  // 글 목록 호출
  useEffect(() => {
    const data = { CategoryId: query.categoryId, includeContent: true };
    dispatch({ type: "GET_POST_LIST_REQUEST", data });
  }, [query]);

  useEffect(() => {
    if (getListDone) dispatch({ type: "GET_POST_LIST_RESET" });
  }, [getListDone]);

  useEffect(() => {
    if (getListError) alert(getListError);
  }, [getListError]);

  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_cont'>리뷰 페이지</h3>
          <div className='wrap_set'>
            <Grid container spacing={2}>
              {items.map((post, i) => (
                <Grid
                  key={post.id + post.title}
                  item
                  xs={6}
                  justify='center'
                  container
                >
                  <CardNode post={post} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      {isViewMode && <CardModal />}
    </main>
  );
};

export default CardList;
