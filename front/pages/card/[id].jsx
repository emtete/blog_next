import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";

import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Button } from "@material-ui/core";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

import TuiEditor from "../../components/TuiEditor";

// import { backUrl } from "../../../config/config";
import { abc } from "./sample";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  media: {
    // height: 380,
    paddingTop: "50%",
  },
  media2: {
    height: 380,
    width: "10em",
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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const Card = () => {
  const classes = useStyles();
  const tuiRef = useRef();
  const demo = abc;

  const isDrawer = useSelector((state) => state.post.isDrawer);

  return (
    // <div className='card_layer'>
    // <div className='inner_card_layer'>
    <main //className={`${classes.content} inner_layout_bar`}
      className={clsx(classes.content1, {
        [classes.contentShift]: isDrawer,
      })}
      style={{ width: "100%" }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <form
          // onSubmit={onSubmitForm}
          className='page_card_layer'
        >
          <div style={{ padding: "30px 30px 10px" }}>
            <div>
              <h1
                style={{
                  // fontSize: "2.75rem",
                  display: "inline",
                }}
              >
                title
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
                {/* {post ? `작성일 : ${changeDateFormat(post.published)}` : ""} */}
                작성일 : 2020 / 10 / 11
              </span>
              {/* {isWriter && (
                <span
                  style={{ color: "#959595", cursor: "pointer" }}
                  // onClick={onClickEdit}
                >
                  {!isEditMode ? "수정" : "취소"}
                </span>
              )} */}
            </div>
          </div>
          <CardMedia
            className={classes.media}
            image={"https://i.imgur.com/qHh3uir.png"}
            title='Contemplative Reptile'
          />
          {/*  */}
          {/* {isEditMode && (
            <span
              style={{
                color: "#959595",
                cursor: "pointer",
                marginRight: "30px",
                marginTop: "10px",
                textAlign: "right",
                display: "block",
              }}
              // onClick={onClickChangeImage}
            >
              이미지 변경
            </span>
          )} */}
          <div style={{ padding: "30px" }}>
            <TuiEditor
              // isEditorMode={!post || isEditMode}
              isEditorMode={false}
              tuiRef={tuiRef}
              // initialContent={post ? post.content : ""}
              initialContent={demo}
              // setContent={setContent}
            />
            {/* {(!post || isEditMode) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  fullWidth={false}
                  size='large'
                >
                  등록
                </Button>
              </div>
            )} */}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Card;
