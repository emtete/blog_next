import { Editor } from "@toast-ui/react-editor";

const EditorWrap = (props) => <Editor {...props} ref={props.forwardedRef} />;

export default EditorWrap;
