import { useState } from "react";
import { useRouter } from "next/router";
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
// import { loginRequestAction, logoutRequestAction } from "../../reducers/user";
// import { resetIndexPathAction } from "../../reducers/category";
import useInput from "../../hooks/useInput";
import Common from "./Common";

import Modal from "@material-ui/core/Modal";

const UserPage = ({ menuList }) => {
  const classes = menuStyles();
  const router = useRouter();
  const [menuListS, setMenuListS] = useState(menuList);

  const onToggleMenu = (e) => {
    e.isExpand = !e.isExpand;
    setMenuListS([...menuListS]);
  };

  console.log("UserPage rendering");
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
      </List>
    </div>
  );
};

export default UserPage;
