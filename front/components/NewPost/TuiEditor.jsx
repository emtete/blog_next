import React, { forwardRef, useEffect } from "react";
import dynamic from "next/dynamic";

import hljs from "highlight.js";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

const Editor = dynamic(() => import("./EditorWrap"), { ssr: false });
const EditorWrap = React.forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));

const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  {
    ssr: false,
  }
);

const TuiEditor = ({ tuiRef, initialContent }) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("css", css);
  });

  const onChangeContent = () => {
    const instance = tuiRef.current.getInstance();
    console.log(tuiRef.current.getInstance().getMarkdown());
  };

  return (
    <EditorWrap
      initialValue={initialContent || ""}
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
