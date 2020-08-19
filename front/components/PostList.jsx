import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

import PostDetail from "./PostDetail";

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
  const [expanded, setExpanded] = React.useState("");
  const dispatch = useDispatch();
  const mainPosts = useSelector((state) => state.post.mainPosts);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  console.log("test", mainPosts.length);
  return (
    <div>
      {mainPosts.map((v, i) => (
        <Accordion
          square
          expanded={expanded === `panel1${i}`}
          onChange={handleChange(`panel1${i}`)}
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
            <Typography>
              <PostDetail postContent={v.content} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
