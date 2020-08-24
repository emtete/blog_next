import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  FormControl,
  TextField,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
} from "@material-ui/core";

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

const getNodeToFlat = (rootNode, currentNode) => {
  let result = [];
  if (rootNode.id === "/") {
    result.push(rootNode);
  }
  for (let i = 0; i < rootNode.children.length; i++) {
    const node = rootNode.children[i];

    let isFamily;
    if (currentNode.id.length === node.id.length) {
      isFamily = currentNode.id === node.id;
    } else if (currentNode.id.length > node.id.length) {
      isFamily = currentNode.id.slice(0, node.id.length) === node.id;
    } else if (currentNode.id.length < node.id.length) {
      isFamily = node.id.slice(0, currentNode.id.length) === node.id;
    }

    if (!isFamily) result.push(node);
    if (Array.isArray(node.children) && node.children.length !== 0) {
      result.push(...getNodeToFlat(node, currentNode));
    }
  }
  return result;
};

export default function SettingsTabs({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialStoredNode = useSelector((state) => state.menu.node);
  const [node, setNode] = React.useState(initialStoredNode);
  const [selected, setSelected] = React.useState("/");

  const path = selected.split("/").slice(1);
  const upperNode = getUpperNode(node, path);
  const currentNode = getNode(node, path) || node;

  const onUp = (e) => {
    if (selected == "/") return;

    const ti = parseInt(path[path.length - 1]);
    const isFirst = path[path.length - 1] == 0;
    if (!isFirst) {
      const temp = upperNode.children[ti - 1];
      upperNode.children[ti - 1] = upperNode.children[ti];
      upperNode.children[ti] = temp;
      upperNode.children[ti - 1].id =
        "/" + path.slice(0, path.length - 1).join("/") + (ti - 1);
      upperNode.children[ti].id =
        "/" + path.slice(0, path.length - 1).join("/") + ti;
      setSelected("/" + path.slice(0, path.length - 1).join("/") + (ti - 1));
    }
  };

  const onDown = (e) => {
    if (selected == "/") return;
    const ti = parseInt(path[path.length - 1]); // targetIndex
    const lastChildIndex = upperNode.children.length - 1;
    const isLast = lastChildIndex == ti;
    if (!isLast) {
      const temp = upperNode.children[ti];
      upperNode.children[ti] = upperNode.children[ti + 1];
      upperNode.children[ti + 1] = temp;
      upperNode.children[ti].id =
        "/" + path.slice(0, path.length - 1).join("/") + ti;
      upperNode.children[ti + 1].id =
        "/" + path.slice(0, path.length - 1).join("/") + (ti + 1);
      setSelected("/" + path.slice(0, path.length - 1).join("/") + (ti + 1));
    }
  };
  const onDelete = (e) => {};
  const onUpdate = (e) => {
    if (selected == "/") return;
    setName(currentNode.name);
    setHref(currentNode.href);
    setParent(currentNode.parent);
    setTitle("UPDATE");
    // setSelectedId(currentNode.id);
    // setSelectedParent(upperNode.id);
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

  const [selectedId, setSelectedId] = React.useState("");
  const [selectedParent, setSelectedParent] = React.useState("/");
  const [name, onChangeName, setName] = useInput("");
  const [href, onChangeHref, setHref] = useInput("");
  const [parent, onChangeParent, setParent] = useInput("");

  const handleChange = (event) => {
    setSelectedParent(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderMenuItem = (arrNode) => {
    return arrNode.map((e) => (
      <MenuItem value={e.id} key={e.key}>
        {e.name}
      </MenuItem>
    ));
  };

  const applyModalContent = (e) => {
    e.preventDefault();
    currentNode.name = name;
    currentNode.href = href;
    const targetMenu = getNode(node, selectedParent.split("/").slice(1));
    targetMenu.children.push(currentNode);
    currentNode.id = targetMenu.id + "/" + (targetMenu.children.length - 1);
    // currentNode를 트리에서 삭제
    upperNode.children.splice(path[path.length - 1], 1);
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={modalClasses.paper}>
      <h2 id='simple-modal-title'>{title}</h2>
      <form
        onSubmit={applyModalContent}
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
          <br />
          <Select
            labelId='parent-select-label'
            id='parent'
            value={selectedParent}
            onChange={handleChange}
          >
            {renderMenuItem(getNodeToFlat(node, currentNode))}
          </Select>
          <br />
          <Button variant='contained' color='primary' type='submit'>
            수정하기
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
