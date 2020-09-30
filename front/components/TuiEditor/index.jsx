import React, { forwardRef, useEffect } from "react";
import dynamic from "next/dynamic";

import hljs from "highlight.js/lib/core";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

const Editor = dynamic(() => import("./EditorWrap"), { ssr: false });
const Viewer = dynamic(() => import("./ViewerWrap"), { ssr: false });

const EditorWrap = React.forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));
const ViewerWrap = React.forwardRef((props, ref) => (
  <Viewer {...props} forwardedRef={ref} />
));

const TuiEditor = ({ isEditorMode, tuiRef, initialContent, setContent }) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("css", css);
  });

  const onChangeContent = () => {
    const instance = tuiRef.current.getInstance();
    setContent(instance.getMarkdown());
  };

  return (
    <>
      {isEditorMode ? (
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
      ) : (
        <ViewerWrap
          initialValue={initialContent || ""}
          previewStyle='vertical'
          height='600px'
          initialEditType='markdown'
          useCommandShortcut={true}
          plugins={[[codeSyntaxHightlight, { hljs }]]}
          ref={tuiRef}
        />
      )}
    </>
  );
};

export default TuiEditor;
