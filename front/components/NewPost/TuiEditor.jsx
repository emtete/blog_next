import React, { Component, createRef, forwardRef, useRef } from "react";
import dynamic from "next/dynamic";

import hljs from "highlight.js";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

// const Editor = dynamic(
//   () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//   }
// );

// const Editor = dynamic(
//   () => import("./TuiEditorWrap").then((mod) => mod.Editor),
//   {
//     ssr: false,
//   }
// );
const Editor = dynamic(() => import("./TuiEditorWrap"), { ssr: false });
const TuiEditorWrap = React.forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));
// const TuiEditorWrap = dynamic(
//   () => import("./TuiEditorWrap").then((mod) => mod.TuiEditorWrap),
//   {
//     ssr: false,
//   }
// );

// const TuiEditorWithRef = forwardRef((props, ref) => {
//   <Editor {...props} forwardedRef={ref} />;
// });

const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  {
    ssr: false,
  }
);

// class TuiEditor extends Component {
//   editorRef = createRef();

//   // handleSubmit() {
//   //   ...
//   //   data.description = this.editorRef.current.getInstance().getHtml();
//   // }
//   handleTuiChange = () => {
//     // console.log("this.editorRef.current", this.editorRef.current);
//     // const value = this.editorRef.current.getInstance().getValue();
//     // console.log(value);
//   };

//   // handleClickaaa = () => {
//   //   this.editorRef.current.getInstance().exec("Bold");
//   // };

//   render() {
//     return (
//       // ...
//       // <Editor
//       //   initialValue={description}
//       //   initialEditType="wysiwyg"
//       //   ref={this.editorRef}
//       // />
//       <>
//         <Editor
//           initialValue=''
//           onChange={this.handleTuiChange}
//           previewStyle='vertical'
//           height='600px'
//           initialEditType='markdown'
//           useCommandShortcut={true}
//           plugins={[[codeSyntaxHightlight, { hljs }]]}
//           ref={this.editorRef}
//         />
//         {/* <button onClick={this.handleClickaaa}>make bold</button> */}
//       </>
//     );
//   }
// }

const TuiEditor = ({ ref }) => {
  const tuiRef = useRef();

  // useEffect(() => {
  //   hljs.registerLanguage("javascript", javascript);
  //   hljs.registerLanguage("css", css);
  // });

  const onChangeContent = () => {
    const instance = tuiRef.current.getInstance();
    console.log(tuiRef.current.getInstance().getMarkdown());
  };

  return (
    <TuiEditorWrap
      // <Editor
      initialValue='hello react editor world!'
      previewStyle='vertical'
      height='600px'
      initialEditType='markdown'
      useCommandShortcut={true}
      plugins={[[codeSyntaxHightlight, { hljs }]]}
      ref={tuiRef}
      onChange={onChangeContent}
    />
    // <Viewer
    //   initialValue='hello react editor world!'
    //   previewStyle='vertical'
    //   height='600px'
    //   initialEditType='markdown'
    //   useCommandShortcut={true}
    //   plugins={[[codeSyntaxHightlight, { hljs }]]}
    // />
  );
};

export default TuiEditor;
