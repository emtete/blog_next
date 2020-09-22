import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "485px",
    height: "150px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 1 auto",
  },
  cover: {
    width: "250px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const ImageRegister = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const imageRef = useRef();

  const imagePaths = useSelector((state) => state.post.imagePaths);

  const onClickImage = useCallback(
    (e) => {
      imageRef.current.click();
    },
    [imageRef.current]
  );

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({ type: "UPLOAD_IMAGES_REQUEST", data: imageFormData });
  });

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            대표 이미지 등록하기
          </Typography>
        </CardContent>
        <div className={`${classes.controls} upload_btn_layer`}>
          <Button color='primary' onClick={onClickImage}>
            이미지 등록
          </Button>
          <input type='file' ref={imageRef} onChange={onChangeImage} />
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={`http://localhost:3065/${imagePaths[0]}`}
        title='Live from space album cover'
      />
    </Card>
  );
};

export default ImageRegister;
