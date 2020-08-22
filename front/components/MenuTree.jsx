import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TreeItem } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";

import { reorderMenuAction } from "../reducers/menu";

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

// 객체를 담은 배열을 계층형식으로 변환시킨다.
const flatToHierarchy = (arr, parent, order) => {
  const result = [];
  let index = arr.findIndex((e) => e.parent === parent && e.order === order);

  while (index !== -1) {
    let child = arr[index];
    let havaChildren = arr.findIndex((e) => e.parent === child.id);

    if (havaChildren !== -1) {
      child["children"] = flatToHierarchy(arr, child.id, 0);
    }
    order++;
    result.push(child);
    arr.splice(index, 1);
    index = arr.findIndex((e) => e.parent === parent && e.order === order);
  }
  return result;
};

export default function MenuTree({ getSelected }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const menuList = useSelector((state) => state.menu.menuList);
  const [selected, setSelected] = React.useState([]);

  const onLabelClick = () => {
    dispatch(reorderMenuAction());
  };

  // const roots = menuList.find((e) => e.id === "root");
  // roots["children"] = flatToHierarchy(menuList, "root", 0);
  // console.log("menuList type : ", typeof menuList);
  // console.log(JSON.stringify(menuList));
  // console.log(JSON.stringify(roots));
  // console.log(JSON.stringify(data));
  // console.log(typeof roots);
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onLabelClick={onLabelClick}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleSelect = (event, nodeIds) => {
    // nodeId == menu order
    setSelected(nodeIds);
    getSelected(nodeIds);
  };

  return (
    <div style={{ width: "300px" }}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={selected}
        onNodeSelect={handleSelect}
      >
        {renderTree(menuList)}
      </TreeView>
    </div>
  );
}
