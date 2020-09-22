import { useEffect } from "react";
import dynamic from "next/dynamic";
import hljs from "highlight.js";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import javascript from "highlight.js/lib/languages/javascript";

const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const TestPost = () => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
  });
  return (
    <Editor
      initialValue='hello react editor world!'
      previewStyle='vertical'
      height='600px'
      initialEditType='markdown'
      useCommandShortcut={true}
      plugins={[[codeSyntaxHightlight, { hljs }]]}
    />
  );
};

export default TestPost;
