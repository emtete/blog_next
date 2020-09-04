import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SettingTabs = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div>abcde</div>
    </main>
  );
};

export default SettingTabs;
