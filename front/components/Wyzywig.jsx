import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const htmlToDraft = dynamic(
  () => import("html-to-draftjs").then((mod) => mod.htmlToDraft),
  { ssr: false }
);

// const draftToHtml = dynamic(
//   () => import("draftjs-to-html").then((mod) => mod.draftToHtml),
//   { ssr: false }
// );

class Wyzywig extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          // wrapperStyle={{ border: "1px solid black" }}
          editorStyle={{
            height: "275px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgb(241, 241, 241)",
            borderImage: "initial",
            padding: "5px",
            borderRadius: "2px",
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

export default Wyzywig;
