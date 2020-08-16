import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import { useMemo } from "react";
import Modal from "@material-ui/core/Modal";

import { modalStyles, getModalStyle } from "./LoginModal";

// 메뉴 토글 버튼
const ToggleButton = styled.div`
  background-color: gray;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: 64px;
  width: 64px;
  background-size: 64px;
  cursor: pointer;
  z-index: 1;
`;

const drawerWidth = 320;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  toolbarCustomising: {
    height: 110,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 24,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#0c2a40",
  },
  drawerPaperMobile: {
    width: "100%",
    backgroundColor: "#0c2a40",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AppLayout = ({ children, window }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // modal start
  const modalClasses = modalStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={modalClasses.paper}>
      <h2 id='simple-modal-title'>Text in a modal</h2>
      <p id='simple-modal-description'>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );
  // modal end

  const drawer = (
    <div>
      <div className={(classes.toolbar, classes.toolbarCustomising)}>
        Full stack Web developer <br /> 최종호
      </div>
      {/* <Divider /> */}
      <List>
        {["Web", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <InboxIcon style={{ color: "#dbdfe2" }} />
              ) : (
                <MailIcon style={{ color: "#dbdfe2" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "#dbdfe2" }} />
          </ListItem>
        ))}
        <ListItem button style={{ color: "#dbdfe2" }} key='login'>
          {/* <Link href='/login'>
            <a>Login</a>
          </Link> */}
          <button type='button' onClick={handleOpen}>
            Open Modal
          </button>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
            >
              {body}
            </Modal>
          </div>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <ToggleButton onClick={handleDrawerToggle}>
            {mobileOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ToggleButton>
          <Drawer
            container={container}
            variant='persistent'
            anchor={theme.direction === "rtl" ? "right" : "top"} // 메뉴가 위에서 나오도록..
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperMobile,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

AppLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppLayout;
