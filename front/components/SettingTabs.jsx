import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import { Divider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import MenuTree from "./MenuTree";
import { reorderMenuAction, selectMenuAction } from "../reducers/menu";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
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
  const [value, setValue] = React.useState(0);
  // const [selectedTree, setSelectedTree] = React.useState([]);
  const node = useSelector((state) => state.menu.node);
  const selected = useSelector((state) => state.menu.selected);

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    // console.log("test : ", newValue);
    // console.log("selectedTree : ", selectedTree);
    const path = selected.split("/").slice(1);
    let targetNode;
    let ti; // targetIndex
    switch (newValue) {
      case "UP":
        targetNode = getUpperNode(node, path);
        ti = parseInt(path[path.length - 1]);
        const isFirst = path[path.length - 1] == 0;
        if (!isFirst) {
          const temp = targetNode.children[ti - 1];
          targetNode.children[ti - 1] = targetNode.children[ti];
          targetNode.children[ti] = temp;
          targetNode.children[ti - 1].id =
            "/" + path.slice(0, path.length - 1).join("/") + (ti - 1);
          targetNode.children[ti].id =
            "/" + path.slice(0, path.length - 1).join("/") + ti;
          dispatch(reorderMenuAction(targetNode));
          dispatch(
            selectMenuAction(
              "/" + path.slice(0, path.length - 1).join("/") + (ti - 1)
            )
          );
        }
        break;
      case "DOWN":
        targetNode = getUpperNode(node, path);
        ti = parseInt(path[path.length - 1]); // targetIndex
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
          dispatch(reorderMenuAction(targetNode));
          dispatch(
            selectMenuAction(
              "/" + path.slice(0, path.length - 1).join("/") + (ti + 1)
            )
          );
        }
        break;
      default:
        break;
    }
  };

  // nodeId == menu order
  // const getSelected = (nodeIds) => {
  //   setSelectedTree(nodeIds);
  // };

  return (
    <div>
      <div className={classes.root}>
        <MenuTree />
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}
        >
          <Divider />
          <Tab
            button
            label='UP'
            icon={<ArrowUpwardOutlinedIcon color='primary' />}
            // disabled={true}
            value='UP'
            {...a11yProps(0)}
          />
          <Divider />
          <Tab
            button
            label='DOWN'
            icon={<ArrowDownwardOutlinedIcon color='primary' />}
            value='DOWN'
            {...a11yProps(1)}
          />
          <Divider />
          <Tab
            button
            label='DELETE'
            icon={<BackspaceOutlinedIcon color='primary' />}
            value='DELETE'
            {...a11yProps(2)}
          />
          <Divider />
          <Tab
            button
            label='UPDATE'
            icon={<CreateIcon color='primary' />}
            value='UPDATE'
            {...a11yProps(3)}
          />
          <Divider />
          <Tab
            button
            label='ADD'
            icon={<AddIcon color='primary' />}
            value='ADD'
            {...a11yProps(4)}
          />
          <Divider />
        </Tabs>
      </div>
    </div>
  );
}
