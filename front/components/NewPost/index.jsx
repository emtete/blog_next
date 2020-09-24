import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControl, Button } from "@material-ui/core";

import ImageRegister from "./ImageRegister";
import TuiEditor from "./TuiEditor";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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

  const writeLoading = useSelector((state) => state.post.writeLoading);
  const writeDone = useSelector((state) => state.post.writeDone);
  const writeError = useSelector((state) => state.post.writeError);

  const updateLoading = useSelector((state) => state.post.updateLoading);
  const updateDone = useSelector((state) => state.post.updateDone);
  const updateError = useSelector((state) => state.post.updateError);

  const loadMyInfoLoading = useSelector(
    (state) => state.user.loadMyInfoLoading
  );
  const loadMyInfoDone = useSelector((state) => state.user.loadMyInfoDone);
  const loadMyInfoError = useSelector((state) => state.user.loadMyInfoError);

  const me = useSelector((state) => state.user.me);
  const orgPost = deepCopy(useSelector((state) => state.post.orgPost));
  const [post, setPost] = useState(orgPost);
  const [title, setTitle] = useState("");
  const flatTreeData = useSelector((state) => state.category.flatTreeData);
  const [selectContents, setSelectContents] = useState([]);
  const [categoryId, setCategoryId] = useState("");

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

  useEffect(() => {
    setSelectContents(flatTreeData);
  }, [flatTreeData]);

  //작성 성공
  useEffect(() => {
    if (writeDone) {
      dispatch({ type: "REMOVE_ORG_POST_ACTION" });
      dispatch({ type: "WRITE_POST_RESET" });
      dispatch({ type: "GET_POST_LIST_REQUEST" });
      router.push("/postManage");
    }
  }, [writeDone]);

  //작성 실패
  useEffect(() => {
    if (writeError) {
      alert(writeError);
      dispatch({ type: "WRITE_POST_RESET" });
    }
  }, [writeError]);

  //수정 성공
  useEffect(() => {
    if (updateDone) {
      dispatch({ type: "REMOVE_ORG_POST_ACTION" });
      dispatch({ type: "UPDATE_POST_RESET" });
      router.push("/postManage");
    }
  }, [updateDone]);

  //수정 실패
  useEffect(() => {
    if (updateError) {
      alert(updateError);
      dispatch({ type: "UPDATE_POST_RESET" });
    }
  }, [updateError]);

  //
  useEffect(() => {
    if (loadMyInfoDone && !me) {
      router.push("/");
    }
  }, [loadMyInfoDone]);

  console.log("Wyzywig rendering");

  return (
    <main className={classes.content}>
      <form onSubmit={onSubmitForm}>
        <FormControl>
          <select
            value={post.categoryId}
            onChange={handleCategoryId}
            style={{ width: 200, marginBottom: "10px" }}
          >
            <option value=''>카테고리 선택</option>
            {selectContents.map((content) => (
              <option key={content.id + content.title} value={content.id}>
                {content.title}
              </option>
            ))}
          </select>
          <ImageRegister post={post} setPost={setPost} />
          <TextField
            id='title'
            label='title'
            onChange={handleTitle}
            value={post.title}
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
