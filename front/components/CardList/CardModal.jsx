import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";

import { sample } from "./sampleData";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const htmlToDraft = dynamic(
  () => import("html-to-draftjs").then((mod) => mod.htmlToDraft),
  { ssr: false }
);

const useStyles = makeStyles((theme) => ({
  // root: {
  //   maxWidth: 245,
  // },
  media: {
    height: 450,
  },
}));

const CardModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const editorContent = EditorState.createEmpty();
  const editorContent = EditorState.createWithContent(convertFromRaw(sample));
  const [editorState, setEditorState] = useState(editorContent);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  // 모달 바깥 클릭시, 창 닫기
  const clickOutSideEvent = (e) => {
    if (e.target.className === "container_layer")
      dispatch({ type: "END_IS_VIEW_MODE_ACTION" });
  };

  // 이벤트 바인딩
  useEffect(() => {
    document.addEventListener("click", clickOutSideEvent);

    return () => {
      document.removeEventListener("click", clickOutSideEvent);
    };
  }, []);
  return (
    <div className='container_layer'>
      <div className='card_layer'>
        <div className='inner_card_layer'>
          <CardMedia
            className={classes.media}
            image='https://pds.joins.com/news/component/htmlphoto_mmdata/201911/10/htm_2019111016135789072.jpg'
            title='Contemplative Reptile'
          />
          <Editor
            readOnly={true}
            defaultEditorState={editorState}
            wrapperClassName='demo-wrapper'
            editorClassName='demo-editor'
            editorStyle={{
              height: "100%",
              width: "100%",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(241, 241, 241)",
              borderImage: "initial",
              padding: "0px",
              borderRadius: "0px",
            }}
            toolbarStyle={{ display: "none" }}
            onEditorStateChange={onEditorStateChange}
            localization={{
              locale: "ko",
            }}
            toolbar={{
              options: [],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardModal;
