import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// 메뉴 토글 버튼 스타일
export const ToggleButton = styled.div`
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

const drawerWidth = 290;

// 메뉴 스타일
export const menuStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
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
    height: 160,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    fontSize: "2rem",
  },
  toolbarCustomising2: {
    // height: 110,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: 100,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#0c2a40",
    borderRight: "3px solid #04c2c9",
  },
  drawerPaperMobile: {
    width: "100%",
    backgroundColor: "#0c2a40",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
