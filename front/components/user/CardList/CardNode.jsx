import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

import { backUrl } from "../../../config/config";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    marginRight: 30,
    marginBottom: 30,
  },
  media: {
    width: 270,
    height: 135,
  },
}));

const CardNode = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickCard = useCallback(() => {
    dispatch({ type: "START_IS_VIEW_MODE_ACTION" });
    dispatch({ type: "SET_SELECTED_POST_ACTION", data: { post } });
  }, [post]);

  return (
    <Card
      style={{ height: "300px" }}
      className={classes.root}
      onClick={onClickCard}
    >
      <CardActionArea>
        {post.imagePath ? (
          <CardMedia
            className={classes.media}
            // image={`${backUrl}${post.imagePath}`}
            image={post.imagePath}
            title='Contemplative Reptile'
          />
        ) : (
          <div className='upload_image_layer'>
            <ImageOutlinedIcon className={classes.media} />
          </div>
        )}
        <CardContent>
          <Typography gutterBottom variant='h6' component='p'>
            {post.title}
          </Typography>
          {/* <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardNode;
