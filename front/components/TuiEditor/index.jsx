import React, { forwardRef, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import hljs from "highlight.js/lib/core";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import { backUrl } from "../../config/config";
import chart from "@toast-ui/editor-plugin-chart";

const Editor = dynamic(() => import("./EditorWrap"), { ssr: false });
const Viewer = dynamic(() => import("./ViewerWrap"), { ssr: false });

const EditorWrap = React.forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));
const ViewerWrap = React.forwardRef((props, ref) => (
  <Viewer {...props} forwardedRef={ref} />
));

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};

const TuiEditor = ({ isEditorMode, tuiRef, initialContent, setContent }) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("css", css);
  });

  const onChangeContent = () => {
    const instance = tuiRef.current.getInstance();
    setContent(instance.getMarkdown());
  };

  const uploadImage = (blob) => {
    let formData = new FormData();

    formData.append("image", blob);
    return axios("/post/images", {
      method: "POST",
      data: formData,
      headers: { "Content-type": "multipart/form-data" },
    }).then((response) => {
      if (response.data) {
        return response.data;
      }
      throw new Error("Server or network error");
    });
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
          plugins={
            ([[codeSyntaxHightlight, { hljs }]], [[chart, chartOptions]])
          }
          ref={tuiRef}
          onChange={onChangeContent}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const uploadedImageURL = await uploadImage(blob);
              callback(backUrl + uploadedImageURL[0]);
              return false;
            },
          }}
        />
      ) : (
        <ViewerWrap
          initialValue={initialContent || ""}
          previewStyle='vertical'
          height='600px'
          initialEditType='markdown'
          useCommandShortcut={true}
          plugins={
            ([[codeSyntaxHightlight, { hljs }]], [[chart, chartOptions]])
          }
          ref={tuiRef}
        />
      )}
    </>
  );
};

export default TuiEditor;
