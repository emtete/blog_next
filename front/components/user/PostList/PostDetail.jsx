import React, { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";

import TuiEditor from "../../TuiEditor";

// const Editor = dynamic(
//   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//   { ssr: false }
// );

// const htmlToDraft = dynamic(
//   () => import("html-to-draftjs").then((mod) => mod.htmlToDraft),
//   { ssr: false }
// );

// class PostDetail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createWithContent(
//         convertFromRaw(this.props.postContent)
//       ),
//     };
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//     // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
{
  /* <Editor
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
        /> */
}
{
  /* <TuiEditor tuiRef={tuiRef} initialContent={post.content} />
      </div>
    );
  }
} */
}

// PostDetail.propTypes = {
//   postContent: PropTypes.object.isRequired,
// };

const PostDetail = () => {
  return <TuiEditor tuiRef={tuiRef} initialContent={post.content} />;
};

export default PostDetail;
