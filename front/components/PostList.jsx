import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import PostDetail from "./PostDetail";

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

  const query = router.query;
  const [expanded, setExpanded] = React.useState("");
  const items = useSelector((state) => state.post.item.items);

  const getListDone = useSelector((state) => state.post.getListDone);
  const getListError = useSelector((state) => state.post.getListError);

  // 글 목록 호출
  useEffect(() => {
    const data = { CategoryId: query.categoryId };
    dispatch({ type: "GET_POST_LIST_REQUEST", data });
  }, [query]);

  useEffect(() => {
    if (getListDone) dispatch({ type: "GET_POST_LIST_RESET" });
  }, [getListDone]);

  useEffect(() => {
    if (getListError) alert(getListError);
  }, [getListError]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <main className={classes.content}>
      <div>
        {items.map((v, i) => (
          <Accordion
            square
            expanded={expanded === `panel1${i}`}
            onChange={handleChange(`panel1${i}`)}
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
              <PostDetail postContent={v.content} />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </main>
  );
}
