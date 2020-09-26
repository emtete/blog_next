import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

import { sample } from "./sampleData";
import TuiEditor from "../../manage/NewPost/TuiEditor";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const htmlToDraft = dynamic(
  () => import("html-to-draftjs").then((mod) => mod.htmlToDraft),
  { ssr: false }
);

const useStyles = makeStyles((theme) => ({
  // root: {
  //   maxWidth: 245,
  // },
  media: {
    height: 380,
  },
  media2: {
    height: 380,
    width: "10em",
  },
}));

const CardModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const imageRef = useRef();
  const tuiRef = useRef();

  const post = useSelector((state) => state.post.selectedPost);

  const imagePaths = useSelector((state) => state.post.imagePaths);
  const [imagePath, setImagePath] = useState("");

  // 모달 바깥 클릭시, 창 닫기
  const clickOutSideEvent = (e) => {
    if (e.target.className === "container_layer")
      dispatch({ type: "END_IS_VIEW_MODE_ACTION" });
  };

  useEffect(() => {
    if (imagePaths) setImagePath(imagePaths[0]);
  }, [imagePaths]);

  // useEffect(() => {
  //   if (post.imagePath) setImagePath(post.imagePath);
  // }, [post.imagePath]);

  // 이벤트 바인딩
  useEffect(() => {
    document.addEventListener("click", clickOutSideEvent);

    return () => {
      document.removeEventListener("click", clickOutSideEvent);
    };
  }, []);

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
    <div className='container_layer'>
      <div className='card_layer'>
        <div className='inner_card_layer'>
          <div style={{ padding: "30px" }}>
            <h1 style={{ fontSize: "2.75rem" }}>제로초 강의 후기</h1>
            <span
              style={{
                display: "block",
                paddingTop: "30px",
                fontSize: "1rem",
              }}
            >
              작성일 : 2020 / 09 / 22
            </span>
          </div>
          {imagePath ? (
            <CardMedia
              className={classes.media}
              image={`http://localhost:3065/${imagePath}`}
              // image={`http://localhost:3065/DEV_LIFE.png`}
              title='Contemplative Reptile'
            />
          ) : (
            <div className='upload_image_layer' onClick={onClickImage}>
              <ImageSearchIcon className={classes.media2} />
              <input type='file' ref={imageRef} onChange={onChangeImage} />
            </div>
          )}
          <div style={{ padding: "30px" }}>
            <TuiEditor
              isEditorMode={false}
              tuiRef={tuiRef}
              initialContent={post.content}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
