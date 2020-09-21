import { useSelector } from "react-redux";

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
  // const dispatch = useDispatch();

  const isViewMode = useSelector((state) => state.post.isViewMode);

  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_cont'>리뷰 페이지</h3>
          <div className='wrap_set'>
            <Grid container spacing={3}>
              <Grid item xs={4} justify='center' container>
                <CardNode />
              </Grid>
              <Grid item xs={4} justify='center' container>
                <CardNode />
              </Grid>
              <Grid item xs={4} justify='center' container>
                <CardNode />
              </Grid>
              <Grid item xs={4} justify='center' container>
                <CardNode />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {isViewMode && <CardModal />}
    </main>
  );
};

export default CardList;
