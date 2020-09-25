import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

// import PostDetail from "./PostDetail";
import TuiEditor from "../NewPost/TuiEditor";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

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

export default function PostList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const tuiRef = useRef();

  const query = router.query;

  const { items, getListDone, getListError } = useSelector(
    (state) => ({
      items: state.post.item.items,
      getListDone: state.post.getListDone,
      getListError: state.post.getListError,
    }),
    (prev, next) => {
      return (
        prev.items === next.items &&
        prev.getListDone === next.getListDone &&
        prev.getListError === next.getListError
      );
    }
  );

  // 글 목록 호출
  useEffect(() => {
    const data = { CategoryId: query.categoryId, includeContent: true };
    dispatch({ type: "GET_POST_LIST_REQUEST", data });
  }, [query]);

  useEffect(() => {
    if (getListDone) dispatch({ type: "GET_POST_LIST_RESET" });
    if (getListError) alert(getListError);
  }, [getListDone, getListError]);

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  return (
    <main className={classes.content}>
      <div>
        {items.map((v, i) => (
          <Accordion
            // square
            // expanded={expanded === `panel1${i}`}
            // onChange={handleChange(`panel1${i}`)}
            key={v.id}
          >
            <AccordionSummary
              aria-controls='panel1d-content'
              id='panel1d-header'
              style={{ justifyContent: "space-between" }}
            >
              <Typography>{v.title}</Typography>
              <Typography>{v.date}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <PostDetail postContent={JSON.parse(v.content)} /> */}
              <TuiEditor
                isEditorMode={false}
                tuiRef={tuiRef}
                initialContent={v.content}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </main>
  );
}
