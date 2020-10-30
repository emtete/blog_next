import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Button } from "@material-ui/core";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";

import TuiEditor from "../../TuiEditor";

import { backUrl } from "../../../config/config";

const useStyles = makeStyles((theme) => ({
  media: {
    // height: 380,
    paddingTop: "50%",
  },
  media2: {
    height: 380,
    width: "10em",
  },
}));

const changeDateFormat = (dateStr) => {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y} / ${m} / ${d}`;
};

const CardModal = ({ categoryId, categoryName, setRerender }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tuiRef = useRef();
  const imageRef = useRef();

  const { me, post, imagePaths } = useSelector(
    (state) => ({
      me: state.user.me,
      post: state.post.selectedPost,
      imagePaths: state.post.imagePaths,
    }),
    (prev, next) => {
      return (
        prev.me === next.me &&
        prev.post === next.post &&
        prev.imagePaths === next.imagePaths
      );
    }
  );

  const isWriter = post && me ? post.UserId === me.id : false;
  const initTitle = post ? post.title : "";
  const initContent = post ? post.content : "";
  const initImagePath = post ? post.imagePath : null;

  const [title, setTitle] = useState(initTitle);
  const [content, setContent] = useState(initContent);
  const [imagePath, setImagePath] = useState(initImagePath);

  const [isEditMode, setIsEditMode] = useState(!post);

  useEffect(() => {
    if (imagePaths) setImagePath(imagePaths[0]);
  }, [imagePaths]);

  // 이벤트 바인딩
  useEffect(() => {
    document.addEventListener("click", clickOutSideEvent);

    return () => {
      document.removeEventListener("click", clickOutSideEvent);
    };
  }, []);

  // 모달 바깥 클릭시, 창 닫기
  const clickOutSideEvent = useCallback((e) => {
    if (e.target.className === "container_layer") {
      closeModal();
    }
  }, []);

  const closeModal = () => {
    setIsEditMode(false);
    dispatch({ type: "SET_SELECTED_POST_ACTION", data: { post: null } });
    dispatch({ type: "END_IS_VIEW_MODE_ACTION" });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    // 새로 작성
    if (!post) {
      const author = "victor_77";
      const data = {
        UserId: me.id,
        author,
        title,
        categoryName,
        CategoryId: categoryId,
        imagePath,
        content,
        isNotice: 0,
      };

      axios
        .post("/post/write", { data }, { withCredentials: true })
        .then((result) => {
          setRerender(true);
          dispatch({ type: "END_IS_VIEW_MODE_ACTION" });
        })
        .catch((err) => {
          alert(err);
        });
    } // 수정
    else {
      if (post.id != me.id) {
        alert("작성자만 글을 수정할 수 있습니다.");
        return;
      }
      const data = {
        id: post.id,
        UserId: me.id,
        author: post.author,
        title,
        categoryName,
        CategoryId: categoryId,
        imagePath,
        content,
        isNotice: 0,
      };

      axios
        .post("/post/update", { data }, { withCredentials: true })
        .then((result) => {
          setIsEditMode(false);
          setRerender(true);
          dispatch({ type: "END_IS_VIEW_MODE_ACTION" });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // const onChangeImage = useCallback((e) => {
  //   const imageFormData = new FormData();

  //   if (e.target.files.length > 1) {
  //     alert("한번에 하나의 이미지만 올릴 수 있습니다.");
  //     return;
  //   }

  //   [].forEach.call(e.target.files, (f) => {
  //     imageFormData.append("image", f);
  //   });
  // axios.post(`/post/images`, data);
  //   dispatch({ type: "UPLOAD_IMAGES_REQUEST", data: imageFormData });
  // });

  // const onClickImage = useCallback(
  //   (e) => {
  //     if (!isEditMode) return;

  //     imageRef.current.click();
  //   },
  //   [imageRef.current, isEditMode]
  // );

  const onClickImage = useCallback(
    (e) => {
      if (!isEditMode) return;
      setImagePath(prompt("image url을 넣어주세요."));
    },
    [imagePath, isEditMode]
  );

  const onHandleTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onClickEdit = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, [isEditMode]);

  const onClickChangeImage = useCallback(() => {
    setImagePath(null);
  }, []);

  const onClickClose = useCallback(() => {
    closeModal();
  }, []);

  return (
    <div
      className='container_layer'
      style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}
    >
      <div className='card_layer'>
        <div className='inner_card_layer'>
          <form onSubmit={onSubmitForm}>
            <div style={{ padding: "30px 30px 10px" }}>
              <div>
                <CloseIcon
                  style={{
                    float: "right",
                    fontSize: "2rem",
                    cursor: "pointer",
                  }}
                  onClick={onClickClose}
                />
                {!post || isEditMode ? (
                  <textarea
                    placeholder='제목을 입력하세요'
                    rows='1'
                    className='post_title'
                    style={{ height: "66px" }}
                    value={title}
                    onChange={onHandleTitle}
                  ></textarea>
                ) : (
                  <h1
                    style={{
                      // fontSize: "2.75rem",
                      width: "90%",
                      display: "inline",
                    }}
                  >
                    {title}
                  </h1>
                )}
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
                {isWriter && (
                  <span
                    style={{ color: "#959595", cursor: "pointer" }}
                    onClick={onClickEdit}
                  >
                    {!isEditMode ? "수정" : "취소"}
                  </span>
                )}
              </div>
            </div>
            {imagePath ? (
              <CardMedia
                className={classes.media}
                // image={`${backUrl}${imagePath}`}
                image={imagePath}
                title='Contemplative Reptile'
              />
            ) : (
              <div className='upload_image_layer' onClick={onClickImage}>
                <ImageSearchIcon className={classes.media2} />
                {/* <input type='file' ref={imageRef} onChange={onChangeImage} /> */}
              </div>
            )}
            {isEditMode && (
              <span
                style={{
                  color: "#959595",
                  cursor: "pointer",
                  marginRight: "30px",
                  marginTop: "10px",
                  textAlign: "right",
                  display: "block",
                }}
                onClick={onClickChangeImage}
              >
                이미지 변경
              </span>
            )}
            <div style={{ padding: "30px" }}>
              <TuiEditor
                isEditorMode={!post || isEditMode}
                tuiRef={tuiRef}
                initialContent={post ? post.content : ""}
                setContent={setContent}
              />
              {(!post || isEditMode) && (
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
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
