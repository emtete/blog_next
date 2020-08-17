// import { Editor } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

// Dependency Component
import AppLayout from "../components/AppLayout";

const Board = () => {
  return (
    <AppLayout>
      <Editor
        // editorState={editorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName'
        // onEditorStateChange={this.onEditorStateChange}
      />
    </AppLayout>
  );
};

export default Board;
