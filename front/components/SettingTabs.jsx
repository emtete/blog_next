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
import { useSelector } from "react-redux";

import MenuTree from "./MenuTree";

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

export default function SettingsTabs({ children }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selectedTree, setSelectedTree] = React.useState([]);
  const menuList = useSelector((state) => state.menu.menuList);

  const handleChange = (event, newValue) => {
    // console.log("test : ", newValue);
    // console.log("selectedTree : ", selectedTree);
    // setValue(newValue);
    // switch (newValue) {
    //   case "UP":
    //     if (selectedTree !== 0) {
    //       const selected = menuList.findIndex((e) => e === selectedTree);
    //     }
    //     break;
    //   default:
    //     break;
    // }
  };

  // nodeId == menu order
  const getSelected = (nodeIds) => {
    setSelectedTree(parseInt(nodeIds));
  };

  return (
    <div>
      <div className={classes.root}>
        <MenuTree getSelected={getSelected} />
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
