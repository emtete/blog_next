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
  FormControlLabel,
  Switch,
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

const getPathArr = (pathStr) => {
  const pathArr = pathStr === "/" ? [] : pathStr.split("/").slice(1);
  return pathArr;
};
const getUpperNode = (rootNode, pathArr) => {
  let result = { ...rootNode };

  // rootNode가 post인 경우.
  if (rootNode.id === undefined) {
    const upperPath = getUpperPath(pathArr);
    const index =
      pathArr.length === 0 ? "/" : upperPath.slice(0, upperPath.length - 2);
    result = rootNode[index];
  } else {
    for (let i = 0; i < pathArr.length - 1; i++) {
      result = result.children[pathArr[i]];
    }
  }

  return result;
};

const getNode = (rootNode, pathArr) => {
  let result = { ...rootNode };

  // rootNode가 post인 경우.
  if (rootNode.id === undefined) {
    const upperPath = getUpperPath(pathArr);
    const index =
      pathArr.length === 0 ? "/" : upperPath.slice(0, upperPath.length - 1);
    result = rootNode[index];
  } else {
    for (let i = 0; i < pathArr.length; i++) {
      result = result.children[pathArr[i]];
    }
  }

  return result;
};

const getNodeToFlat = (rootNode, selectedId) => {
  let result = [];
  if (rootNode.id === "/") {
    result.push(rootNode);
  }
  for (let i = 0; i < rootNode.children.length; i++) {
    const node = rootNode.children[i];

    let isFamily;
    if (selectedId.length === node.id.length) {
      isFamily = selectedId === node.id;
    } else if (selectedId.length < node.id.length) {
      isFamily = node.id.slice(0, selectedId.length) === node.id;
    }
    // else if (selectedId.length > node.id.length) {
    //   isFamily = selectedId.slice(0, node.id.length) === node.id;
    // }

    if (!isFamily) result.push(node);
    if (Array.isArray(node.children) && node.children.length !== 0) {
      result.push(...getNodeToFlat(node, selectedId));
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

  if (Array.isArray(arr1.children) && arr1.children.length > 0) {
    changeChildrenId(arr1, arr1.id);
  }
  if (Array.isArray(arr2.children) && arr2.children.length > 0) {
    changeChildrenId(arr2, arr2.id);
  }
};

// parent의 id가 바뀔 경우, 그 parent의 id에 맞게 children의 id와 parentId를 바꿔준다.
// const changeChildrenId = (parent, parentId, initialStoredPost) => {
const changeChildrenId = (parent, parentId) => {
  if (!(Array.isArray(parent.children) && parent.children.length > 0)) return;
  // if (typeof parent.children[0].content === "object") {
  //   const prevParentId = parent.children[0].parentId;
  //   const temp = initialStoredPost[prevParentId];
  //   initialStoredPost[parentId] = temp;
  //   delete initialStoredPost[prevParentId];
  // }

  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i];
    const path = node.id.split("/");
    node.parentId = parentId;
    // node.id = parentId + "/" + path[path.length - 1];
    node.id = parentId + "/" + i;

    if (Array.isArray(node.children) && node.children.length > 0) {
      // changeChildrenId(node, node.id, initialStoredPost);
      changeChildrenId(node, node.id);
    }
  }
};

//노드 삭제시, 그 다음 노드들의 id를 수정한다.(앞으로 당긴다)
const changeIdWhenDelete = (
  rootNode,
  deletedNodePathArr
  // ,
  // initialStoredPost
) => {
  const deletedNodeIndex = parseInt(
    deletedNodePathArr[deletedNodePathArr.length - 1]
  );
  const upperNode = getUpperNode(rootNode, deletedNodePathArr);
  const upperPath = getUpperPath(deletedNodePathArr);
  for (let i = deletedNodeIndex; i < upperNode.children.length; i++) {
    const id = upperPath + i;
    upperNode.children[i].id = id;
    // changeChildrenId(upperNode.children[i], id, initialStoredPost);
    changeChildrenId(upperNode.children[i], id);
  }
};

// getContainedPosts에 매개변수로 넣을 값을 처리하는 함수.
const getContainedPostsWrap = (upperPath, ti, node) => {
  let pathArr1 = getPathArr(upperPath + (ti - 1));
  let pathArr2 = getPathArr(upperPath + ti);
  let target1 = getNode(node, pathArr1);
  let target2 = getNode(node, pathArr2);
  let postIdArr1 = getContainedPosts(target1);
  let postIdArr2 = getContainedPosts(target2);
  return [postIdArr1, postIdArr2];
};

// getContainedPosts에 매개변수로 넣을 값을 처리하는 함수.
const getContainedPostsWrap2 = (upperPath, delIndex, node) => {
  const result = [];
  const upperNode = getNode(node, getPathArr(upperPath));

  for (let i = delIndex; i < upperNode.children.length - 1; i++) {
    let pathArr = getPathArr(upperPath + i);
    let target = getNode(node, pathArr);
    let postIdArr = getContainedPosts(target);
    // console.log("pathArr : ", pathArr);
    // console.log("target : ", target);
    // console.log("postIdArr : ", postIdArr);
    postIdArr && result.push(postIdArr);
  }

  return result;
};

// 매개변수로 전달된 메뉴의 트리구조에서
// post를 검색하고, 검색된 post의 parentId의 배열을
// 리턴한다.
const getContainedPosts = (targetNode) => {
  const result = [];
  const children = targetNode.children;
  if (!(Array.isArray(children) && children.length > 0)) return;
  for (let i = 0; i < children.length; i++) {
    if (
      Array.isArray(children[i].children) &&
      children[i].children.length > 0
    ) {
      result.push(...getContainedPosts(children[i]));
    } else if (typeof children[i].content === "object") {
      result.push(children[i].parentId);
      break;
    }
  }

  return result;
};

// menu를 이동시켜서 post의 parentId가 변경된 경우
// initialStoredPost의 키(parentId)를 변경하기 위해 만든 함수.
const interchangePostKey = (prevKeyArr, nextKeyArr, initialStoredPost) => {
  if (!(Array.isArray(prevKeyArr) && Array.isArray(nextKeyArr))) return;
  for (let i = 0; i < prevKeyArr.length; i++) {
    initialStoredPost[nextKeyArr[i]] = initialStoredPost[prevKeyArr[i]];
    delete initialStoredPost[prevKeyArr[i]];
  }
};

// const changeIdOnPost = (initialStoredPost, parentId) => {
//   const postArr = initialStoredPost[parentId];
//   post
// };

//path 의 상위 path를 반환한다. ex) /0/1/
const getUpperPath = (pathArr) => {
  let upperPath = "/" + pathArr.slice(0, pathArr.length - 1).join("/");
  upperPath += upperPath.trim().length > 1 ? "/" : "";

  return upperPath;
};

// 포스트가 있는 메뉴를 배열에 담아 반환한다.
const menuHavePost = (menu) => {
  const result = [];
  if (Array.isArray(menu.children) && menu.children.length > 0) {
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
        // initialStoredPost id 수정, 삭제
        const containPostIds = menuHavePost(getNode(node, path));
        containPostIds.map((e) => {
          const upperPath = getUpperPath(e.split("/").slice(1));
          delete initialStoredPost[upperPath.slice(0, upperPath.length - 1)];
        });

        // initialStoredNode에서 삭제
        upperNode.children.splice(path[path.length - 1], 1);

        // initialStoredNode가 포함한 id수정
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
        // initialStoredPost 에서 삭제
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

      // initialStoredPost의 키를 변경해야 할 때 필요한 값.
      const [prevKeyArr1, prevKeyArr2] = getContainedPostsWrap(
        upperPath,
        ti,
        node
      );

      if (isMenu) {
        changeMenuState("UP", upperPath);
      } else {
        changePostState("UP", upperPath);
      }

      changeCombineState("UP", upperPath);
      setSelected(upperPath + (ti - 1));

      // initialStoredPost의 키를 변경해야 할 때 필요한 값.
      const [nextKeyArr1, nextKeyArr2] = getContainedPostsWrap(
        upperPath,
        ti,
        node
      );

      // initialStoredPost의 키를 변경하는 함수.
      interchangePostKey(prevKeyArr1, nextKeyArr2, initialStoredPost);
      interchangePostKey(prevKeyArr2, nextKeyArr1, initialStoredPost);

      // console.log("node : ", node);
      // console.log("initialStoredNode : ", initialStoredNode);
      // console.log("initialStoredPost : ", initialStoredPost);
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

      // initialStoredPost의 키를 변경해야 할 때 필요한 값.
      const [prevKeyArr1, prevKeyArr2] = getContainedPostsWrap(
        upperPath,
        ti + 1,
        node
      );

      if (isMenu) {
        changeMenuState("DOWN", upperPath);
      } else {
        changePostState("DOWN", upperPath);
      }

      changeCombineState("DOWN", upperPath);
      setSelected(upperPath + (ti + 1));

      // initialStoredPost의 키를 변경해야 할 때 필요한 값.
      const [nextKeyArr1, nextKeyArr2] = getContainedPostsWrap(
        upperPath,
        ti + 1,
        node
      );

      // initialStoredPost의 키를 변경하는 함수.
      interchangePostKey(prevKeyArr1, nextKeyArr2, initialStoredPost);
      interchangePostKey(prevKeyArr2, nextKeyArr1, initialStoredPost);

      // console.log("node : ", node);
      // console.log("initialStoredNode : ", initialStoredNode);
      // console.log("initialStoredPost : ", initialStoredPost);
    }
  };

  const onDelete = (e) => {
    if (selected == "/") return;

    const ti = parseInt(path[path.length - 1]); // targetIndex
    const nodeKeys = Object.keys(currentNode);
    const isMenu = nodeKeys.find((key) => key === "children");

    // initialStoredPost의 키를 변경해야 할 때 필요한 값.
    const prevKeyArr = getContainedPostsWrap2(upperPath, ti, node);
    console.log("prevKeyArr : ", prevKeyArr);
    if (isMenu) {
      changeMenuState("DELETE", upperPath);
    } else {
      changePostState("DELETE", upperPath);
    }

    changeCombineState("DELETE", upperPath);
    setSelected("/");

    // initialStoredPost의 키를 변경해야 할 때 필요한 값.
    const nextKeyArr = getContainedPostsWrap2(upperPath, ti, node);
    console.log("nextKeyArr : ", nextKeyArr);
    // initialStoredPost의 키를 변경하는 함수.
    // interchangePostKey(prevKeyArr1, nextKeyArr2, initialStoredPost);
    // interchangePostKey(prevKeyArr2, nextKeyArr1, initialStoredPost);

    for (let i = 0; i < prevKeyArr.length; i++) {
      initialStoredPost[nextKeyArr[i]] = initialStoredPost[prevKeyArr[i]];
      delete initialStoredPost[prevKeyArr[i]];
    }

    console.log("node : ", node);
    console.log("initialStoredNode : ", initialStoredNode);
    console.log("initialStoredPost : ", initialStoredPost);

    // console.log("node: ", node);
    // console.log("initialStoredNode: ", initialStoredNode);
    // console.log("initialStoredPost: ", initialStoredPost);
    // upperNode.children[path[path.length - 1]].name = "";
    // currentNode를 트리에서 삭제
    // upperNode.children.splice(path[path.length - 1], 1);
    setSelected("/");
  };

  const onUpdate = (e) => {
    if (selected == "/") return;
    setName(currentNode.name);
    setHref(currentNode.href);
    setSelectedParent(currentNode.parentId);
    setTitle("UPDATE");
    setShowParent(true);
    setShowResultant(false);
    handleOpen();
  };
  const onAdd = (e) => {
    const nodeKeys = Object.keys(currentNode);
    const isMenu = nodeKeys.find((key) => key === "children");
    if (!isMenu) return;

    setTitle("ADD");
    setName("");
    setHref("");
    setSelectedParent("");
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
  const [resultant, onChangeResultant] = useInput("menu");

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
    const pathArr = getPathArr(selected);

    switch (title) {
      case "ADD":
        const newKey = getDateStr(new Date());
        const newName = name;
        const newHref = href;
        const newParentName = currentNode.name;
        const newParentId = currentNode.id;
        const newId =
          selected === "/"
            ? "/" + currentNode.children.length
            : selected + "/" + currentNode.children.length;

        const newNode = {
          key: newKey,
          id: newId,
          name: newName,
          parentId: newParentId,
          parentName: newParentName,
        };

        if (resultant === "menu") {
          newNode["href"] = newHref;
          newNode["children"] = [];
          const currentNode = getNode(initialStoredNode, pathArr);
          currentNode.children.push(newNode);
        } else if (resultant === "post") {
          newNode["date"] = newKey;
          newNode["content"] = {};
          const currentNode = getNode(initialStoredPost, pathArr);

          if (Array.isArray(initialStoredPost[selected])) {
            initialStoredPost[selected].push(newNode);
          } else {
            initialStoredPost[selected] = [newNode];
          }
        }

        currentNode.children.push(newNode);
        break;

      case "UPDATE":
        const nodeKeys = Object.keys(currentNode);
        const isMenu = nodeKeys.find((key) => key === "children");

        if (isMenu) {
          // initialStoredNode pathArr, selectedParent
          const currentNode = getNode(initialStoredNode, pathArr);
          const upperNode = getUpperNode(initialStoredNode, pathArr);
          const targetMenu = getNode(
            initialStoredNode,
            getPathArr(selectedParent)
          );

          // 입력받은 값으로 데이터 변경
          currentNode.name = name;
          currentNode.href = href;

          // 이동시킬 메뉴를 선택(자신이 아닌)했을 때만 옮김처리 실행
          if (selectedParent !== currentNode.parentId) {
            upperNode.children.splice(path[path.length - 1], 1);
            changeIdWhenDelete(initialStoredNode, path, initialStoredPost);
            targetMenu.children.push(currentNode);
            changeChildrenId(targetMenu, targetMenu.id, initialStoredPost);
          }
        } else {
          const pathArr = getPathArr(selected);
          const currentNode = getNode(initialStoredPost, pathArr);
          const postArr = getNode(initialStoredPost, pathArr);
          const parentId = postArr[0].parentId;
          const index = path[path.length - 1];

          // 입력받은 값으로 데이터 변경
          initialStoredPost[parentId][index].name = name;

          // 이동시킬 메뉴를 선택(자신이 아닌)했을 때만 옮김처리 실행
          if (selectedParent !== parentId) {
            const temp = initialStoredPost[parentId][index];
            console.log("temp : ", temp);
            initialStoredPost[parentId].splice(index, 1);
            console.log("initialStoredPost : ", initialStoredPost);
            const keys = Object.keys(initialStoredPost);
            if (keys.find((e) => e === selectedParent) === undefined) {
              initialStoredPost[selectedParent] = [temp];
              console.log("selectedParent : ", selectedParent);
            } else {
              initialStoredPost[selectedParent].push(temp);
            }
          }
        }

        // 입력받은 값으로 데이터 변경
        currentNode.name = name;
        currentNode.href = href;
        const targetMenu = getNode(node, selectedParent.split("/").slice(1));

        // 이동시킬 메뉴를 선택(자신이 아닌)했을 때만 옮김처리 실행
        if (selectedParent !== currentNode.parentId) {
          upperNode.children.splice(path[path.length - 1], 1);
          changeIdWhenDelete(node, path, initialStoredPost);
          // 삭제 후 푸시, 변경
          // currentNode.id =
          //   targetMenu.id + "/" + (targetMenu.children.length - 1);
          targetMenu.children.push(currentNode);
          changeChildrenId(targetMenu, targetMenu.id, initialStoredPost);
        }
        console.log("node : ", node);
        console.log("initialStoredNode : ", initialStoredNode);
        console.log("initialStoredPost : ", initialStoredPost);

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
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {/* 수정 할 수 있는 내용 : name, href, parent */}
        {/* <FormControl> */}
        <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
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
              {renderMenuItem(getNodeToFlat(initialStoredNode, currentNode))}
            </Select>
          )}
          <br />
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
        </div>
        {/* </FormControl> */}
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
