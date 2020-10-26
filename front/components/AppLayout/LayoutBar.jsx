import { useDispatch, useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const LayoutBar = ({ handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isDrawer = useSelector((state) => state.post.isDrawer);

  const handleDrawerOpen = () => {
    const data = { isDrawer: true };
    dispatch({ type: "SET_TOGGLE_IS_DRAWER_ACTION", data });
  };

  const handleDrawerClose = () => {
    const data = { isDrawer: false };
    dispatch({ type: "SET_TOGGLE_IS_DRAWER_ACTION", data });
  };

  return (
    <div className={`${classes.root}`} id='layout_bar'>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={
          classes.appBar
          //   clsx(classes.appBar, {
          //   [classes.appBarShift]: isDrawer,
          // })
        }
      >
        <Toolbar>
          {/* <Typography variant='h6' noWrap> */}
          {/* {isDrawer ? (
            <NavigateBeforeIcon
              style={{ cursor: "pointer" }}
              onClick={handleDrawerClose}
            />
          ) : (
            <NavigateNextIcon
              style={{ cursor: "pointer" }}
              onClick={handleDrawerOpen}
            />
          )} */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <MenuIcon style={{ cursor: "pointer" }} onClick={handleDrawerOpen} /> */}
          {/* <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton> */}
          {/* </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LayoutBar;
