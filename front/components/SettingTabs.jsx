import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";

import MenuTree from "./MenuTree";
import {
  saveMenuAction,
  selectMenuAction,
  initialState,
  toggleUpdateAction,
} from "../reducers/menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const getUpperNode = (parentNode, path) => {
  let result = { ...parentNode };
  for (let i = 0; i < path.length - 1; i++) {
    result = result.children[path[i]];
  }
  return result;
};

const getNode = (parentNode, path) => {
  let result = { ...parentNode };
  for (let i = 0; i < path.length; i++) {
    result = result.children[path[i]];
  }
  return result;
};

export default function SettingsTabs({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialStoredNode = useSelector((state) => state.menu.node);
  const [node, setNode] = React.useState(initialStoredNode);
  const [selected, setSelected] = React.useState("/");

  const onUp = (e) => {
    if (selected == "/") return;
    const path = selected.split("/").slice(1);
    const targetNode = getUpperNode(node, path);
    const ti = parseInt(path[path.length - 1]);
    const isFirst = path[path.length - 1] == 0;
    if (!isFirst) {
      const temp = targetNode.children[ti - 1];
      targetNode.children[ti - 1] = targetNode.children[ti];
      targetNode.children[ti] = temp;
      targetNode.children[ti - 1].id =
        "/" + path.slice(0, path.length - 1).join("/") + (ti - 1);
      targetNode.children[ti].id =
        "/" + path.slice(0, path.length - 1).join("/") + ti;
      setSelected("/" + path.slice(0, path.length - 1).join("/") + (ti - 1));
    }
  };

  const onDown = (e) => {
    if (selected == "/") return;
    const path = selected.split("/").slice(1);
    const targetNode = getUpperNode(node, path);
    const ti = parseInt(path[path.length - 1]); // targetIndex
    const lastChildIndex = targetNode.children.length - 1;
    const isLast = lastChildIndex == ti;
    if (!isLast) {
      const temp = targetNode.children[ti];
      targetNode.children[ti] = targetNode.children[ti + 1];
      targetNode.children[ti + 1] = temp;
      targetNode.children[ti].id =
        "/" + path.slice(0, path.length - 1).join("/") + ti;
      targetNode.children[ti + 1].id =
        "/" + path.slice(0, path.length - 1).join("/") + (ti + 1);
      setSelected("/" + path.slice(0, path.length - 1).join("/") + (ti + 1));
    }
  };
  const onDelete = (e) => {};
  const onUpdate = (e) => {};
  const onAdd = (e) => {};
  const onSave = (e) => {
    dispatch(saveMenuAction(node));
    dispatch(toggleUpdateAction());
  };

  const data = [
    {
      onClick: onUp,
      name: "UP",
      icon: <ArrowUpwardOutlinedIcon color='primary' />,
    },
    {
      onClick: onDown,
      name: "DOWN",
      icon: <ArrowDownwardOutlinedIcon color='primary' />,
    },
    {
      onClick: onDelete,
      name: "DELETE",
      icon: <BackspaceOutlinedIcon color='primary' />,
    },
    {
      onClick: onUpdate,
      name: "UPDATE",
      icon: <CreateIcon color='primary' />,
    },
    {
      onClick: onAdd,
      name: "ADD",
      icon: <AddIcon color='primary' />,
    },
    {
      onClick: onSave,
      name: "SAVE",
      icon: <SaveIcon color='primary' />,
    },
  ];

  return (
    <main
      className={classes.content}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div>
        <div className={classes.root}>
          <MenuTree node={node} selected={selected} setSelected={setSelected} />
          <ButtonGroup
            orientation='vertical'
            color='primary'
            aria-label='vertical contained primary button group'
            variant='text'
          >
            {data.map((e) => (
              <Button onClick={e.onClick} key={e.name}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {e.icon}
                  {e.name}
                </div>
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
