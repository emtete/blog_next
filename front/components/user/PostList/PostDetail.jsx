import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import axios from "axios";

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

const PostDetail = ({ post, CategoryId, categoryName, setRerender }) => {
  const tuiRef = useRef();
  const dispatch = useDispatch();

  const isNewPost = post.id === "";
  const [isEditMode, setIsEditMode] = useState(isNewPost);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const me = useSelector((state) => state.user.me);

  const onClickBtn1 = useCallback(() => {
    if (isEditMode) {
      setIsEditMode(false);
    } // 수정
    else {
      setIsEditMode(true);
    }
  }, [isEditMode]);

  const onSubmitForm = (e) => {
    e.preventDefault();

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
        isNotice: 0,
      };

      axios
        .post("/post/write", { data }, { withCredentials: true })
        .then((result) => {
          setRerender(true);
        })
        .catch((err) => {
          alert(err);
        });
    } // 수정
    else {
      const author = "victor_77";
      const data = {
        id: post.id,
        UserId: me.id,
        author,
        title,
        categoryName,
        CategoryId,
        content,
        isNotice: 0,
      };

      axios
        .post("/post/update", { data }, { withCredentials: true })
        .then((result) => {
          setRerender(true);
          setIsEditMode(false);
        })
        .catch((err) => {
          alert(err);
        });
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
            style={{ fontSize: "1.2rem", width: "72%" }}
          />
        ) : (
          <Typography style={{ fontSize: "1.2rem" }}>{title}</Typography>
        )}

        <Typography>{post.date}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TuiEditor
          isEditorMode={isEditMode}
          tuiRef={tuiRef}
          initialContent={content}
          setContent={setContent}
        />
      </AccordionDetails>
      <AccordionActions>
        {me && !isNewPost && (
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
