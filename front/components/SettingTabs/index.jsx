import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { FormControl, TextField, Button, ButtonGroup } from "@material-ui/core";

import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";

import { modalStyles, getModalStyle } from "../layout/LoginStyles";
import MenuTree from "./MenuTree";
import {
  saveMenuAction,
  selectMenuAction,
  initialState,
  toggleUpdateAction,
} from "../../reducers/menu";
import useInput from "../../hooks/useInput";

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

const getUpperNode = (rootNode, path) => {
  let result = { ...rootNode };
  for (let i = 0; i < path.length - 1; i++) {
    result = result.children[path[i]];
  }
  return result;
};

const getNode = (rootNode, path) => {
  let result = { ...rootNode };
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
  const onUpdate = (e) => {
    if (selected == "/") return;
    const path = selected.split("/").slice(1);
    const upperNode = getUpperNode(node, path);
    const currentNode = getNode(node, path);
    setName(currentNode.name);
    setHref(currentNode.href);
    setParent(currentNode.parent);
    setTitle("UPDATE");
    handleOpen();
  };
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

  // modal start---
  const modalClasses = modalStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const [name, onChangeName, setName] = useInput("");
  const [href, onChangeHref, setHref] = useInput("");
  const [parent, onChangeParent, setParent] = useInput("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleHandle = () => {
  //   if (isLoggedIn) {
  //     dispatch(logoutAction());
  //   } else {
  //     handleOpen();
  //   }
  // };

  // const onSubmitForm = () => {
  // dispatch(loginAction());
  // handleClose();
  // };

  const body = (
    <div style={modalStyle} className={modalClasses.paper}>
      <h2 id='simple-modal-title'>{title}</h2>
      <form
        // onSubmit={onSubmitForm}
        className={classes.root}
        noValidate
        autoComplete='off'
      >
        {/* 수정 할 수 있는 내용 : name, href, parent */}
        <FormControl>
          <TextField
            id='name'
            label='name'
            value={name}
            onChange={onChangeName}
          />
          <TextField
            id='href'
            label='href'
            value={href}
            onChange={onChangeHref}
          />
          <TextField
            id='parent'
            label='parent'
            value={parent}
            onChange={onChangeParent}
          />
          <br />
          <Button variant='contained' color='primary' type='submit'>
            로그인
          </Button>
        </FormControl>
      </form>
    </div>
  );
  // modal end---

  return (
    <main
      className={classes.content}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
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
