import { Editor } from "@toast-ui/react-editor";

// const TuiEditorWrap = ({ forwardedRef }) => (
//   // <div ref={forwardedRef}>Hi from Component</div>
//   <Editor {...props} ref={forwardedRef} />
// );

// export default TuiEditorWrap;

export default (props) => <Editor {...props} ref={props.forwardedRef} />;

// import React from "react";

// export interface TuiEditorWithForwardedProps extends EditorProps {
//   forwardedRef?: React.MutableRefObject<Editor>;
// }

// export default (props: TuiEditorWithForwardedProps) => (
//   <Editor {...props} ref={props.forwardedRef} />
// );
