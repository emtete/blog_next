import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControl, Button } from "@material-ui/core";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const htmlToDraft = dynamic(
  () => import("html-to-draftjs").then((mod) => mod.htmlToDraft),
  { ssr: false }
);

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

const getTreeToFlatData = (treeData) => {
  const treeDataClone = deepCopy(treeData);
  const clone = [];

  treeDataClone.map((node1, index1) => {
    clone.push(node1);
    if (getIsArray(node1.children)) {
      node1.children.map((node2, index2) => {
        clone.push(node2);
      });
    }
  });

  return clone;
};

const Wyzywig = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const writeLoading = useSelector((state) => state.post.writeLoading);
  const writeDone = useSelector((state) => state.post.writeDone);
  const writeError = useSelector((state) => state.post.writeError);

  const me = useSelector((state) => state.user.me);
  const orgPost = deepCopy(useSelector((state) => state.post.orgPost));
  const [post, setPost] = useState(orgPost);
  // console.log(post);
  const [title, setTitle] = useState("");
  const treeData = useSelector((state) => state.category.treeData);
  const flatDataArr = getTreeToFlatData(treeData);
  const [selectContents, setSelectContents] = useState(flatDataArr);
  const [categoryId, setCategoryId] = useState("");

  const editorContent =
    post.content !== null
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))
      : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(editorContent);

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

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    // 새로 작성
    if (orgPost.title === "") {
      const author = "victor_77";
      const data = {
        id: post.id,
        UserId: me.id,
        author: author,
        title: post.title,
        categoryName: post.categoryName,
        categoryId: post.categoryId,
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
        content: content,
      };
      dispatch({ type: "EDIT_POST_REQUEST", data });
    }
  };

  //작성 성공
  useEffect(() => {
    if (writeDone) {
      dispatch({ type: "REMOVE_ORG_POST_ACTION" });
      dispatch({ type: "WRITE_POST_RESET" });
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

  console.log("Wyzywig rendering");

  return (
    <main className={classes.content}>
      <form onSubmit={onSubmitForm}>
        <FormControl>
          <select
            value={post.categoryId}
            onChange={handleCategoryId}
            style={{ width: 200 }}
          >
            <option value=''>카테고리 선택</option>
            {selectContents.map((content) => (
              <option key={content.id + content.title} value={content.id}>
                {content.title}
              </option>
            ))}
          </select>
          <TextField
            id='title'
            label='title'
            onChange={handleTitle}
            value={post.title}
          />
          <br />
          <Editor
            editorState={editorState}
            wrapperClassName='demo-wrapper'
            editorClassName='demo-editor'
            editorStyle={{
              height: "275px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgb(241, 241, 241)",
              borderImage: "initial",
              padding: "5px",
              borderRadius: "2px",
            }}
            onEditorStateChange={onEditorStateChange}
            localization={{
              locale: "ko",
            }}
          />
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
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

export default Wyzywig;
