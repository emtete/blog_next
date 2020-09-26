import { Viewer } from "@toast-ui/react-editor";

const ViewerWrap = (props) => <Viewer {...props} ref={props.forwardedRef} />;

export default ViewerWrap;
