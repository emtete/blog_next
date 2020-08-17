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
// import { Link } from "@material-ui/core";
import { useMemo } from "react";
import Modal from "@material-ui/core/Modal";
import { FormControl, TextField, Button } from "@material-ui/core";

import { modalStyles, getModalStyle } from "./layout/LoginStyles";
import { ToggleButton, menuStyles } from "./layout/styles";

const AppLayout = ({ children, window }) => {
  const classes = menuStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // modal start---
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
      <h2 id='simple-modal-title'>로그인</h2>
      {/* <p id='simple-modal-description'>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      <form>
        <form className={classes.root} noValidate autoComplete='off'>
          <FormControl>
            <TextField id='id' label='id' />
            <TextField id='id' label='password' />
            <br />
            <Button variant='contained' color='primary'>
              로그인
            </Button>
          </FormControl>
        </form>
      </form>
    </div>
  );
  // modal end---

  const drawer = (
    <div>
      <div className={(classes.toolbar, classes.toolbarCustomising)}>
        Full stack Web developer <br /> 최종호
      </div>
      {/* <Divider /> */}
      <List>
        <Link href='/board'>
          <a style={{ textDecoration: "none" }}>
            <ListItem button={true} style={{ color: "#dbdfe2" }} key='board'>
              <ListItemIcon>
                <InboxIcon style={{ color: "#dbdfe2" }} />
              </ListItemIcon>
              <ListItemText primary='게시판' style={{ color: "#dbdfe2" }} />
            </ListItem>
          </a>
        </Link>
        {["Starred", "Send email", "Drafts"].map((text, index) => (
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
  children: PropTypes.node.isRequired,
  window: PropTypes.func,
};

export default AppLayout;
