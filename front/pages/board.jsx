import dynamic from "next/dynamic";
// import {con} from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import { draftToHtml } from "react-draft-wysiwyg";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

// Dependency Component
import AppLayout from "../components/AppLayout";
import { useState } from "react";

const Board = () => {
  const [editorState, setEditorState] = useState();

  const onEditorStateChange = (editorState) => {
    setEditorState({
      editorState,
    });
  };

  return (
    <AppLayout>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onEditorStateChange={onEditorStateChange}
        />
        <textarea
          disabled
          // value={Editor.draftToHtml(
          //   Editor.convertToRaw(editorState.getCurrentContent())
          // )}
        />
      </div>
    </AppLayout>
  );
};

export default Board;
