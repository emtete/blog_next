import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function settings() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState([0]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // const labelId = `checkbox-list-label-${value}`;
  const labelId = `checkbox-list-label-1`;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Nested List Items
          </ListSubheader>
        }
        className={classes.root}
      >
        {/* <ListItem button> */}
        {/* key={value} */}
        <ListItem role={undefined} dense button onClick={handleToggle(1)}>
          <ListItemIcon>
            <Checkbox
              edge='start'
              checked={checked.indexOf(1) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText primary='Sent mail' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary='Drafts' />
        </ListItem>
        <ListItem button selected={true}>
          <ListItemIcon>
            <InboxIcon />
            {/* <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction> */}
          </ListItemIcon>
          {/* <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction> */}
          <ListItemText primary='Inbox' />
          {open ? (
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='expand'>
                <ExpandLess button onClick={handleClick} />
              </IconButton>
            </ListItemSecondaryAction>
          ) : (
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='expand'>
                <ExpandMore button onClick={handleClick} />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary='Starred' />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
