import React, { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
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

const contentObject = {
  blocks: [
    {
      key: "2v2v4",
      text: "Hey this editor rocks 😀",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 15,
          style: "color-rgb(0,0,0)",
        },
        {
          offset: 16,
          length: 7,
          style: "color-rgb(0,0,0)",
        },
        {
          offset: 0,
          length: 15,
          style: "fontsize-medium",
        },
        {
          offset: 21,
          length: 2,
          style: "fontsize-medium",
        },
        {
          offset: 0,
          length: 15,
          style: "fontfamily-Roboto",
        },
        {
          offset: 16,
          length: 7,
          style: "fontfamily-Roboto",
        },
        {
          offset: 9,
          length: 6,
          style: "BOLD",
        },
        {
          offset: 16,
          length: 5,
          style: "fontsize-30",
        },
      ],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

class Wyzywig extends Component {
  state = {
    // editorState: EditorState.createEmpty(),
    editorState: EditorState.createWithContent(convertFromRaw(contentObject)),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          readOnly={true}
          // editorState={editorState}
          defaultEditorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          // wrapperStyle={{ border: "1px solid black" }}
          editorStyle={{
            // height: "275px",
            // borderWidth: "1px",
            // borderStyle: "solid",
            // borderColor: "rgb(241, 241, 241)",
            // borderImage: "initial",
            // padding: "5px",
            // borderRadius: "2px",
            height: "100%",
            width: "100%",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(241, 241, 241)",
            borderImage: "initial",
            padding: "0px",
            borderRadius: "0px",
          }}
          toolbarStyle={{ display: "none" }}
          onEditorStateChange={this.onEditorStateChange}
          localization={{
            locale: "ko",
          }}
          toolbar={{
            options: [],
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default Wyzywig;
