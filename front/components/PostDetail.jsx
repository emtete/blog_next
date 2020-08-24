import React, { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const htmlToDraft = dynamic(
  () => import("html-to-draftjs").then((mod) => mod.htmlToDraft),
  { ssr: false }
);

class PostDetail extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.postContent);

    this.state = {
      editorState: EditorState.createWithContent(
        convertFromRaw(this.props.postContent)
      ),
    };
  }

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
          defaultEditorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          editorStyle={{
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
      </div>
    );
  }
}

PostDetail.propTypes = {
  postContent: PropTypes.object.isRequired,
};

export default PostDetail;
