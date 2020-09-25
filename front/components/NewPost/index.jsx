import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControl, Button, Input } from "@material-ui/core";

import ImageRegister from "./ImageRegister";
import TuiEditor from "./TuiEditor";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    fontSize: "2.75rem",
    fontWeight: "bold",
  },
}));

const getIsArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const NewPost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const tuiRef = useRef();

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

  const { updateLoading, updateDone, updateError } = useSelector(
    (state) => ({
      updateLoading: state.post.updateLoading,
      updateDone: state.post.updateDone,
      updateError: state.post.updateError,
    }),
    (prev, next) => {
      return (
        prev.updateLoading === next.updateLoading &&
        prev.updateDone === next.updateDone &&
        prev.updateError === next.updateError
      );
    }
  );

  const { loadMyInfoLoading, loadMyInfoDone, loadMyInfoError } = useSelector(
    (state) => ({
      loadMyInfoLoading: state.user.loadMyInfoLoading,
      loadMyInfoDone: state.user.loadMyInfoDone,
      loadMyInfoError: state.user.loadMyInfoError,
    }),
    (prev, next) => {
      return (
        prev.loadMyInfoLoading === next.loadMyInfoLoading &&
        prev.loadMyInfoDone === next.loadMyInfoDone &&
        prev.loadMyInfoError === next.loadMyInfoError
      );
    }
  );

  const { me, orgPost, flatTreeData } = useSelector(
    (state) => ({
      me: state.user.me,
      orgPost: state.post.orgPost,
      flatTreeData: state.category.flatTreeData,
    }),
    (prev, next) => {
      return (
        prev.me === next.me &&
        prev.orgPost === next.orgPost &&
        prev.flatTreeData === next.flatTreeData
      );
    }
  );

  const [post, setPost] = useState(orgPost);

  useEffect(() => {
    //작성 성공
    if (writeDone) {
      dispatch({ type: "REMOVE_ORG_POST_ACTION" });
      dispatch({ type: "WRITE_POST_RESET" });
      dispatch({ type: "GET_POST_LIST_REQUEST" });
      router.push("/postManage");
    }
    //작성 실패
    if (writeError) {
      alert(writeError);
      dispatch({ type: "WRITE_POST_RESET" });
    }
  }, [writeDone, writeError]);

  useEffect(() => {
    //수정 성공
    if (updateDone) {
      dispatch({ type: "REMOVE_ORG_POST_ACTION" });
      dispatch({ type: "UPDATE_POST_RESET" });
      router.push("/postManage");
    }

    //수정 실패
    if (updateError) {
      alert(updateError);
      dispatch({ type: "UPDATE_POST_RESET" });
    }
  }, [updateDone, updateError]);

  //
  useEffect(() => {
    if (loadMyInfoDone && !me) {
      router.push("/");
    }
  }, [loadMyInfoDone]);

  const handleTitle = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const handleCategoryId = (e) => {
    let selectText;

    Array.from(e.target.children).map((node) => {
      if (node.value == e.target.value) {
        selectText = node.textContent;
      }
    });

    setPost({ ...post, categoryId: e.target.value, categoryName: selectText });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const content = tuiRef.current.getInstance().getMarkdown();

    // 새로 작성
    if (orgPost.title === "") {
      const author = "victor_77";
      const data = {
        id: post.id,
        UserId: me.id,
        author: author,
        title: post.title,
        categoryName: post.categoryName,
        CategoryId: post.categoryId,
        imagePath: post.imagePath,
        content: content,
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

  console.log("Wyzywig rendering");

  return (
    <main className={classes.content}>
      <form onSubmit={onSubmitForm}>
        <FormControl>
          <select
            value={post.categoryId}
            onChange={handleCategoryId}
            style={{ width: 200, marginBottom: "20px" }}
          >
            <option value=''>카테고리 선택</option>
            {flatTreeData.map((content) => (
              <option key={content.id + content.title} value={content.id}>
                {content.title}
              </option>
            ))}
          </select>
          <ImageRegister post={post} setPost={setPost} />
          <Input
            id='title'
            placeholder='제목을 입력하세요.'
            onChange={handleTitle}
            value={post.title}
            className={classes.root}
            aria-describedby='my-helper-text'
          />
          <br />
          <TuiEditor
            isEditorMode={true}
            tuiRef={tuiRef}
            initialContent={post.content}
          />
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
        </FormControl>
      </form>
    </main>
  );
};

export default NewPost;
