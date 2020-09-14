import React, { Component, useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import { TextField, FormControl, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { addPost } from "../reducers/post";

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

const getDateStr = (date) => {
  let sYear = date.getFullYear();
  let sMonth = date.getMonth() + 1;
  let sDate = date.getDate();
  let sHours = date.getHours();
  let sMinutes = date.getMinutes();
  let sSeconds = date.getSeconds();

  sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
  sDate = sDate > 9 ? sDate : "0" + sDate;
  return sYear + sMonth + sDate + sHours + sMinutes + sSeconds;
};

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
  const { me } = useSelector((state) => state.user);
  const mainPosts = useSelector((state) => state.post.mainPosts);
  const { treeData } = useSelector((state) => state.category);
  const flatDataArr = getTreeToFlatData(treeData);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [selectContents, setSelectContents] = useState(flatDataArr);
  const [selectValue, setSelectValue] = useState("");

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const author = "victor_77";
    const categoryId = selectValue;
    const data = { UserId: me.id, author, title, categoryId, content };
    console.log(content);
    dispatch({
      type: "WRITE_POST_REQUEST",
      data,
    });
  };

  const onChangeText = (e) => {
    setTitle(e.target.value);
  };

  return (
    <main className={classes.content}>
      <form onSubmit={onSubmitForm}>
        <FormControl>
          <select
            value={selectValue}
            onChange={handleSelect}
            style={{ width: 200 }}
          >
            <option value=''>카테고리 선택</option>
            {selectContents.map((content) => (
              <option key={content.id + content.title} value={content.id}>
                {content.title}
              </option>
            ))}
          </select>
          <TextField id='title' label='title' onChange={onChangeText} />
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
