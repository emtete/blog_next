import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Button } from "@material-ui/core";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

import { sample } from "./sampleData";
import TuiEditor from "../../TuiEditor";

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

const CardModal = ({ categoryId, categoryName }) => {
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

  const { writeLoading, writeDone, writeError } = useSelector(
    (state) => ({
      writeLoading: state.post.writeLoading,
      writeDone: state.post.writeDone,
      writeError: state.post.writeError,
    }),
    (prev, next) => {
      return (
        prev.writeLoading === next.writeLoading &&
        prev.writeDone === next.writeDone &&
        prev.writeError === next.writeError
      );
    }
  );

  const initImagePath = post ? post.imagePath : null;
  const initTitle = post ? post.title : "";
  const [imagePath, setImagePath] = useState(initImagePath);
  const [title, setTitle] = useState(initTitle);

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

  useEffect(() => {
    //작성 성공
    if (writeDone) {
      // dispatch({ type: "REMOVE_ORG_POST_ACTION" });
      const data = { CategoryId: categoryId, includeContent: true };
      dispatch({ type: "WRITE_POST_RESET" });
      dispatch({ type: "GET_POST_LIST_REQUEST", data });
      dispatch({ type: "END_IS_VIEW_MODE_ACTION" });
      // router.push("/postManage");
    }
    //작성 실패
    if (writeError) {
      alert(writeError);
      dispatch({ type: "WRITE_POST_RESET" });
    }
  }, [writeDone, writeError]);

  // useEffect(() => {
  //   //수정 성공
  //   if (updateDone) {
  //     dispatch({ type: "REMOVE_ORG_POST_ACTION" });
  //     dispatch({ type: "UPDATE_POST_RESET" });
  //     router.push("/postManage");
  //   }

  //   //수정 실패
  //   if (updateError) {
  //     alert(updateError);
  //     dispatch({ type: "UPDATE_POST_RESET" });
  //   }
  // }, [updateDone, updateError]);

  // 모달 바깥 클릭시, 창 닫기
  const clickOutSideEvent = useCallback((e) => {
    if (e.target.className === "container_layer") {
      dispatch({ type: "END_IS_VIEW_MODE_ACTION" });
      dispatch({ type: "SET_SELECTED_POST_ACTION", data: { post: null } });
    }
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const content = tuiRef.current.getInstance().getMarkdown();

    // 새로 작성
    if (!post) {
      const author = "victor_77";
      const data = {
        // id: post.id,
        UserId: me.id,
        author,
        title,
        categoryName,
        CategoryId: categoryId,
        imagePath,
        content,
      };
      dispatch({ type: "WRITE_POST_REQUEST", data });
    } // 수정
    else {
      const data = {
        id: post.id,
        UserId: me.id,
        author: post.author,
        title: post.title,
        categoryName: post.categoryName,
        categoryId: post.categoryId,
        imagePath: post.imagePath,
        content: content,
      };
      dispatch({ type: "UPDATE_POST_REQUEST", data });
    }
  };

  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();

    if (e.target.files.length > 1) {
      alert("한번에 하나의 이미지만 올릴 수 있습니다.");
      return;
    }

    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });

    dispatch({ type: "UPLOAD_IMAGES_REQUEST", data: imageFormData });
  });

  const onClickImage = useCallback(
    (e) => {
      imageRef.current.click();
    },
    [imageRef.current]
  );

  const onHandleTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  return (
    <div className='container_layer'>
      <div className='card_layer'>
        <div className='inner_card_layer'>
          <form onSubmit={onSubmitForm}>
            <div style={{ padding: "30px" }}>
              {post ? (
                <h1 style={{ fontSize: "2.75rem" }}>{title}</h1>
              ) : (
                <textarea
                  placeholder='제목을 입력하세요'
                  rows='1'
                  className='post_title'
                  style={{ height: "66px" }}
                  value={title}
                  onChange={onHandleTitle}
                ></textarea>
              )}
              <span
                style={{
                  display: "block",
                  paddingTop: "30px",
                  fontSize: "1rem",
                }}
              >
                {post ? `작성일 : ${post.published}` : ""}
              </span>
            </div>
            {imagePath ? (
              <CardMedia
                className={classes.media}
                image={`http://localhost:3065/${imagePath}`}
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
                isEditorMode={!post}
                tuiRef={tuiRef}
                initialContent={post ? post.content : ""}
              />
              {!post && (
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
