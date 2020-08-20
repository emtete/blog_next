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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  // return (
  //   <div
  //     role='tabpanel'
  //     hidden={value !== index}
  //     id={`vertical-tabpanel-${index}`}
  //     aria-labelledby={`vertical-tab-${index}`}
  //     {...other}
  //   >
  //     {value === index && (
  //       <Box p={5}>
  //         <Typography>{children}</Typography>
  //       </Box>
  //     )}
  //   </div>
  // );

  return <div>{value === index && <div>{children}</div>}</div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={classes.root}>
        <TabPanel value={value} index={0}>
          {children}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
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
            {...a11yProps(0)}
          />
          <Divider />
          <Tab
            button
            label='DOWN'
            icon={<ArrowDownwardOutlinedIcon />}
            {...a11yProps(1)}
          />
          <Divider />
          <Tab
            button
            label='DELETE'
            icon={<BackspaceOutlinedIcon />}
            {...a11yProps(2)}
          />
          <Divider />
          <Tab button label='UPDATE' icon={<CreateIcon />} {...a11yProps(2)} />
          <Divider />
          <Tab button label='ADD' icon={<AddIcon />} {...a11yProps(2)} />
          <Divider />
        </Tabs>
      </div>
    </div>
  );
}
