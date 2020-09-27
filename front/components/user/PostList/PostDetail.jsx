import { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import TuiEditor from "../../TuiEditor";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
    justifyContent: "space-between",
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const PostDetail = ({ post, CategoryId, categoryName }) => {
  const tuiRef = useRef();
  const dispatch = useDispatch();
  const isNewPost = post.id === "";
  const [isEditMode, setIsEditMode] = useState(isNewPost);
  const [title, setTitle] = useState(post.title);

  const { me } = useSelector(
    (state) => ({
      me: state.user.me,
    }),
    (prev, next) => {
      return prev.me === next.me;
    }
  );

  const onClickBtn1 = useCallback(() => {
    if (isEditMode) {
      //
      setIsEditMode(false);
    } // 수정
    else {
      setIsEditMode(true);
    }
  }, [isEditMode]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const content = tuiRef.current.getInstance().getMarkdown();

    // 새로 작성
    if (isNewPost) {
      const author = "victor_77";
      const data = {
        UserId: me.id,
        author,
        title,
        categoryName,
        CategoryId,
        content,
      };
      console.log("data : ", data);
      dispatch({ type: "WRITE_POST_REQUEST", data });
    } // 수정
    else {
      const data = {
        id: post.id,
        UserId: me.id,
        author: post.author,
        title,
        categoryName,
        CategoryId: categoryId,
        imagePath,
        content,
      };
      // dispatch({ type: "UPDATE_POST_REQUEST", data });
    }
  };

  const onHandleTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  return (
    <Accordion key={post.id + post.date}>
      <AccordionSummary
        aria-controls='panel1d-content'
        id='panel1d-header'
        style={{ justifyContent: "space-between" }}
      >
        {isEditMode ? (
          <Input
            type='text'
            value={title}
            onChange={onHandleTitle}
            style={{ fontSize: "2rem", width: "72%" }}
          />
        ) : (
          <Typography>{title}</Typography>
        )}

        <Typography>{post.date}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TuiEditor
          isEditorMode={isEditMode}
          tuiRef={tuiRef}
          initialContent={post.content}
          // editType='wysiwyg'
          height={"70vh"}
        />
      </AccordionDetails>
      <AccordionActions>
        {!isNewPost && (
          <Button size='small' onClick={onClickBtn1}>
            {isEditMode ? "취소" : "수정"}
          </Button>
        )}
        {isEditMode && (
          <form onSubmit={onSubmitForm}>
            <Button size='small' color='primary' type='submit'>
              확인
            </Button>
          </form>
        )}
      </AccordionActions>
    </Accordion>
  );
};

export default PostDetail;
