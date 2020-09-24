import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import hljs from "highlight.js";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";

const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  {
    ssr: false,
  }
);

const TestPost = () => {
  const tuiRef = useRef();

  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("css", css);
  });

  const onChangeContent = () => {
    console.log(tuiRef.current.getInstance());
  };

  return (
    <Editor
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

export default TestPost;
