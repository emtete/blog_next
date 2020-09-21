import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 245,
  },
  media: {
    height: 200,
  },
}));

const CardNode = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickCard = () => {
    dispatch({ type: "START_IS_VIEW_MODE_ACTION" });
  };

  return (
    <Card className={classes.root} onClick={onClickCard}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='https://pds.joins.com/news/component/htmlphoto_mmdata/201911/10/htm_2019111016135789072.jpg'
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardNode;
