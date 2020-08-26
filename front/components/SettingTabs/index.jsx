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

const getDateStr = (date) => {
  let sYear = date.getFullYear();
  let sMonth = date.getMonth() + 1;
  let sDate = date.getDate();
  let sHours = date.getHours();
  let sMinutes = date.getMinutes();
  let sSeconds = date.getSeconds();

  sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
  sDate = sDate > 9 ? sDate : "0" + sDate;
  return sYear + sMonth + sDate + sHours + sMinutes + sSeconds;
};

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
    // console.log("result : ", result);
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

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const combineMenuAndPost = (menu, postObject) => {
  const result = deepCopy(menu);
  const keys = Object.keys(postObject);
  for (let i = 0; i < keys.length; i++) {
    postObject[keys[i]].map((post) => {
      console.log("result : ", result);
      // console.log("path", post.parentId.split("/").slice(1));
      console.log("path", post.parentId);
      const parentMenu = getNode(result, post.parentId.split("/").slice(1));
      parentMenu.children.push(post);
    });
  }
  return result;
};

const interChangeArrOrder = (arr, index) => {
  const temp = arr[index - 1];
  arr[index - 1] = arr[index];
  arr[index] = temp;
};

const interChangeArrId = (arr, index, upperPath) => {
  const arr1 = arr[index - 1];
  const arr2 = arr[index];

  arr1.id = upperPath + (index - 1);
  arr2.id = upperPath + index;

  console.log("upperPath", upperPath);
  // console.log("upperPath", upperPath);
  // console.log("arr1 id : ", arr1.id);
  // console.log("arr2 id : ", arr2.id);

  if (Array.isArray(arr1.children) && arr1.children.length > 0) {
    changeChildrenId(arr1, arr1.id);
  }
  if (Array.isArray(arr2.children) && arr2.children.length > 0) {
    changeChildrenId(arr2, arr2.id);
  }
};

// parent의 id가 바뀔 경우, 그 parent의 id에 맞게 children의 id와 parentId를 바꿔준다.
const changeChildrenId = (parent, parentId, initialStoredPost) => {
  if (!(Array.isArray(parent.children) && parent.children.length > 0)) return;
  if (typeof parent.children[0].content === "object") {
    // console.log("initialStoredPost");
    const prevParentId = parent.children[0].parentId;
    const temp = initialStoredPost[prevParentId];
    initialStoredPost[parentId] = temp;
    delete initialStoredPost[prevParentId];
  }

  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i];
    const path = node.id.split("/");
    node.parentId = parentId;
    node.id = parentId + "/" + path[path.length - 1];

    if (Array.isArray(node.children) && node.children.length > 0) {
      changeChildrenId(node, node.id, initialStoredPost);
    }
  }
};

//노드 삭제시, 그 다음 노드들의 id를 수정한다.(앞으로 당긴다)
const changeIdWhenDelete = (
  rootNode,
  deletedNodePathArr,
  initialStoredPost
) => {
  const deletedNodeIndex = parseInt(
    deletedNodePathArr[deletedNodePathArr.length - 1]
  );
  const upperNode = getUpperNode(rootNode, deletedNodePathArr);
  const upperPath = getUpperPath(deletedNodePathArr);
  for (let i = deletedNodeIndex; i < upperNode.children.length; i++) {
    const id = upperPath + i;
    upperNode.children[i].id = id;
    console.log("upperNode.children[i] : ", upperNode.children[i]);
    changeChildrenId(upperNode.children[i], id, initialStoredPost);
  }
};

//path 의 상위 path를 반환한다. ex) /0/1/
const getUpperPath = (pathArr) => {
  let upperPath = "/" + pathArr.slice(0, pathArr.length - 1).join("/");
  upperPath += upperPath.trim().length > 1 ? "/" : "";

  return upperPath;
};

// 포스트가 있는 메뉴를 배열에 담아 반환한다.
const menuHavePost = (menu) => {
  const result = [];
  // console.log("menu : ", menu);
  // console.log("typeof : ", typeof menu.content);
  // if (typeof menu.content === "object") {
  //   result.push(menu.id);
  // } else
  if (Array.isArray(menu.children) && menu.children.length > 0) {
    // menu.children.map((e) => {
    //   if (typeof e.content === "object") {
    //     result.push(menu.id);
    //   }
    //   result.push(...menuHavePost(e));
    // });
    for (let i = 0; i < menu.children.length; i++) {
      if (typeof menu.children[i].content === "object") {
        result.push(menu.children[i].id);
        break;
      } else {
        result.push(...menuHavePost(menu.children[i]));
      }
    }
  }
  return result;
};

const delChildren = (targetNode) => {
  //
};

// targetPath에 있는 노드의 다음 노드를 반환한다.
// const getNextNode = (rootNode, targetPath) => {
//   parseInt(deletedNodePath[deletedNodePath.length - 1]);
//   getUpperNode(rootNode, deletedNodeId);
// };

export default function SettingsTabs({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialStoredNode = useSelector((state) => state.menu.node);
  const initialStoredPost = useSelector((state) => state.post.mainPosts);
  const [selected, setSelected] = React.useState("/");
  const [node, setNode] = React.useState(
    combineMenuAndPost(initialStoredNode, initialStoredPost)
  );

  const path = selected.split("/").slice(1);
  const upperNode = getUpperNode(node, path);
  const currentNode = getNode(node, path) || node;
  let upperPath = "/" + path.slice(0, path.length - 1).join("/");
  upperPath += upperPath.trim().length > 1 ? "/" : "";

  const changeMenuState = (role, upperPath) => {
    const path = selected.split("/").slice(1);
    const ti = parseInt(path[path.length - 1]);
    const upperNode = getUpperNode(initialStoredNode, path);

    switch (role) {
      case "UP":
        interChangeArrOrder(upperNode.children, ti);
        interChangeArrId(upperNode.children, ti, upperPath);
        break;

      case "DOWN":
        interChangeArrOrder(upperNode.children, ti + 1);
        interChangeArrId(upperNode.children, ti + 1, upperPath);
        break;

      case "DELETE":
        // havePost
        const containPostIds = menuHavePost(getNode(node, path));
        containPostIds.map((e) => {
          const upperPath = getUpperPath(e.split("/").slice(1));
          delete initialStoredPost[upperPath.slice(0, upperPath.length - 1)];
        });
        upperNode.children.splice(path[path.length - 1], 1);
        changeIdWhenDelete(initialStoredNode, path, initialStoredPost);

        break;
      case "UPDATE":
        break;
      case "ADD":
        break;
      case "SAVE":
        break;
    }
  };

  const changePostState = (role, upperPath) => {
    const path = selected.split("/").slice(1);
    const ti = parseInt(path[path.length - 1]);
    const upperNode = initialStoredPost[selected.slice(0, selected.length - 2)];

    switch (role) {
      case "UP":
        interChangeArrOrder(upperNode, ti);
        interChangeArrId(upperNode, ti, upperPath);

        break;
      case "DOWN":
        interChangeArrOrder(upperNode, ti + 1);
        interChangeArrId(upperNode, ti + 1, upperPath);
        break;

      case "DELETE":
        // console.log("upperNode, POST", upperNode);
        // currentNode를 트리에서 삭제
        upperNode.splice(path[path.length - 1], 1);
        changeIdWhenDelete(node, path, initialStoredPost);
        break;

      case "UPDATE":
        break;
      case "ADD":
        break;
      case "SAVE":
        break;
    }
  };

  const changeCombineState = (role, upperPath) => {
    const path = selected.split("/").slice(1);
    const ti = parseInt(path[path.length - 1]);
    const upperNode = getUpperNode(node, path);

    switch (role) {
      case "UP":
        interChangeArrOrder(upperNode.children, ti);
        interChangeArrId(upperNode.children, ti, upperPath);

        break;
      case "DOWN":
        interChangeArrOrder(upperNode.children, ti + 1);
        interChangeArrId(upperNode.children, ti + 1, upperPath);
        break;

      case "DELETE":
        // currentNode를 트리에서 삭제
        upperNode.children.splice(path[path.length - 1], 1);
        changeIdWhenDelete(node, path, initialStoredPost);
        break;
      case "UPDATE":
        break;
      case "ADD":
        break;
      case "SAVE":
        break;
    }
  };

  const onUp = (e) => {
    if (selected == "/") return;

    const ti = parseInt(path[path.length - 1]);
    const isFirst = path[path.length - 1] == 0;

    if (!isFirst) {
      const nodeKeys = Object.keys(currentNode);
      const isMenu = nodeKeys.find((key) => key === "children");
      // let upperPath = "/" + path.slice(0, path.length - 1).join("/");
      // upperPath += upperPath.trim().length > 1 ? "/" : "";

      if (isMenu) {
        changeMenuState("UP", upperPath);
      } else {
        changePostState("UP", upperPath);
      }

      changeCombineState("UP", upperPath);
      setSelected(upperPath + (ti - 1));
    }
  };

  const onDown = (e) => {
    if (selected == "/") return;

    const ti = parseInt(path[path.length - 1]); // targetIndex
    const lastChildIndex = upperNode.children.length - 1;
    const isLast = lastChildIndex == ti;

    if (!isLast) {
      const nodeKeys = Object.keys(currentNode);
      const isMenu = nodeKeys.find((key) => key === "children");
      // let upperPath = "/" + path.slice(0, path.length - 1).join("/");
      // upperPath += upperPath.trim().length > 1 ? "/" : "";

      if (isMenu) {
        changeMenuState("DOWN", upperPath);
      } else {
        changePostState("DOWN", upperPath);
      }

      changeCombineState("DOWN", upperPath);
      setSelected(upperPath + (ti + 1));
    }
  };

  const onDelete = (e) => {
    if (selected == "/") return;

    const nodeKeys = Object.keys(currentNode);
    const isMenu = nodeKeys.find((key) => key === "children");

    if (isMenu) {
      changeMenuState("DELETE", upperPath);
    } else {
      changePostState("DELETE", upperPath);
    }

    changeCombineState("DELETE", upperPath);
    console.log("node : ", node);
    console.log("initialStoredNode : ", initialStoredNode);
    console.log("initialStoredPost : ", initialStoredPost);

    // upperNode.children[path[path.length - 1]].name = "";
    // currentNode를 트리에서 삭제
    // upperNode.children.splice(path[path.length - 1], 1);
    setSelected("/");
  };

  const onUpdate = (e) => {
    if (selected == "/") return;
    setName(currentNode.name);
    setHref(currentNode.href);
    setParent(currentNode.parent);
    setTitle("UPDATE");
    // setSelectedId(currentNode.id);
    // setSelectedParent(upperNode.id);
    setShowParent(true);
    setShowResultant(false);
    handleOpen();
  };
  const onAdd = (e) => {
    setTitle("ADD");
    setName("");
    setHref("");
    setParent("");
    setShowParent(false);
    setShowResultant(true);
    handleOpen();
  };
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
  const [showParent, setShowParent] = React.useState(true);
  const [showResultant, setShowResultant] = React.useState(true);

  const [selectedId, setSelectedId] = React.useState("");
  const [selectedParent, setSelectedParent] = React.useState("/");
  const [name, onChangeName, setName] = useInput("");
  const [href, onChangeHref, setHref] = useInput("");
  const [parent, onChangeParent, setParent] = useInput("");
  const [resultant, onChangeResultant, setResultant] = useInput("menu");

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
    // const nodeKeys = Object.keys(currentNode);
    // const isMenu = nodeKeys.find((key) => key === "children");

    // if (isMenu) {
    //   changeMenuState("ADD", upperPath);
    // } else {
    //   changePostState("ADD", upperPath);
    // }

    // changeCombineState("ADD", upperPath);

    switch (title) {
      case "ADD":
        if (!isMenu) return;
        const newKey = getDateStr(new Date());
        const newId = currentNode.id + "/" + (currentNode.children.length - 1);
        const newName = name;
        const newHref = href;
        const newParentName = currentNode.name;
        const newParentId = currentNode.id;
        const resultant = "";

        // const date
        const newNode = {
          key: newKey,
          id: newId,
          name: newName,
          parentId: newParentId,
          parentName: newParentName,
        };

        // if (isMenu) {
        //   newNode["href"] = newHref;
        //   newNode["children"] = [];
        // } else {
        //   newNode["date"] = newKey;
        //   newNode["content"] = {};
        // }

        currentNode.children.push(newNode);
        break;
      case "UPDATE":
        currentNode.name = name;
        currentNode.href = href;
        const targetMenu = getNode(node, selectedParent.split("/").slice(1));
        targetMenu.children.push(currentNode);
        currentNode.id = targetMenu.id + "/" + (targetMenu.children.length - 1);
        // currentNode를 트리에서 삭제
        upperNode.children.splice(path[path.length - 1], 1);
        break;
    }
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
          {showParent && (
            <Select
              labelId='parent-select-label'
              id='parent'
              value={selectedParent}
              onChange={handleChange}
              // style={showParent}
            >
              {renderMenuItem(getNodeToFlat(node, currentNode))}
            </Select>
          )}
          {showResultant && (
            <Select
              labelId='resultant-select-label'
              id='resultant'
              value={resultant}
              onChange={onChangeResultant}
            >
              <MenuItem value='menu' key='menu'>
                Menu
              </MenuItem>
              <MenuItem value='post' key='post'>
                Post
              </MenuItem>
            </Select>
          )}
          <br />
          <Button variant='contained' color='primary' type='submit'>
            확인
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
