import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Toolbar from "@material-ui/core/Toolbar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import { FormControl, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { modalStyles, getModalStyle } from "../layout/LoginStyles";
import { ToggleButton, menuStyles } from "../layout/styles";
import { loginRequestAction, logoutRequestAction } from "../../reducers/user";
import { resetIndexPathAction } from "../../reducers/category";
import useInput from "../../hooks/useInput";
import Common from "./Common";

import Modal from "@material-ui/core/Modal";

const UserPage = ({ menuList }) => {
  const classes = menuStyles();

  const handleHandle = () => {
    // if (me) {
    //   dispatch(logoutRequestAction());
    // } else {
    //   handleOpen();
    // }
  };
  return (
    <div>
      <div className={(classes.toolbar, classes.toolbarCustomising)}>
        DEV LIFE
      </div>
      <List>
        {menuList.map((e, index) => (
          <div key={e.id}>
            <ListItem
              button
              key={e.id}
              style={{ color: "#dbdfe2" }}
              onClick={() => {
                e.href ? router.push(e.href) : onToggleMenu(e);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon style={{ color: "#dbdfe2" }} />
                ) : (
                  <MailIcon style={{ color: "#dbdfe2" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={e.name} style={{ color: "#dbdfe2" }} />
              {Array.isArray(e.children) && e.children.length > 0 ? (
                e.isExpand ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {Array.isArray(e.children) && e.children.length > 0 && (
              <Collapse in={e.isExpand} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {e.children.map((ee, iindex) => (
                    <ListItem
                      key={ee.id}
                      button
                      className={classes.nested}
                      style={{ color: "#dbdfe2" }}
                      onClick={() => {
                        ee.href ? router.push(ee.href) : console.log(2);
                      }}
                    >
                      <ListItemIcon>
                        <MailIcon style={{ color: "#dbdfe2" }} />
                      </ListItemIcon>
                      <ListItemText primary={ee.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
        <Common />
        {/* <Divider style={{ backgroundColor: "#ffffff" }} />
        <ListItem
          style={{ color: "#dbdfe2", justifyContent: "center" }}
          key='login'
        >
          <Button style={{ color: "#ffffff" }} onClick={handleHandle}>
            {me ? "로그아웃" : "로그인"}
          </Button>
          <IconButton
            style={{ color: "#ffffff" }}
            aria-label='upload picture'
            component='span'
            onClick={onHandleAdmim}
          >
            {isAdmin ? <PersonIcon /> : <SettingsIcon />}
          </IconButton>
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
        </ListItem> */}
      </List>
    </div>
  );
};

export default UserPage;
