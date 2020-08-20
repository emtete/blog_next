import React, { Component, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import { TextField, FormControl, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { addPost } from "../reducers/post";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const htmlToDraft = dynamic(
  () => import("html-to-draftjs").then((mod) => mod.htmlToDraft),
  { ssr: false }
);

const Wyzywig = () => {
  const dispatch = useDispatch();
  const mainPosts = useSelector((state) => state.post.mainPosts);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    const date = "1년 전";
    dispatch(addPost({ title, date, content }), [title, date, content]);
  };

  const onChangeText = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <FormControl>
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
  );
};

export default Wyzywig;
