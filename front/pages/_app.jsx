import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import { useRouter } from "next/router";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

import { useSelector, useDispatch, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import UserPage from "../components/AppLayout/UserPage";
import ManagerPage from "../components/AppLayout/ManagerPage";
import "codemirror/lib/codemirror.css";
import "highlight.js/styles/github.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-editor/dist/tui-editor.min.css";
import "tui-editor/dist/tui-editor-contents.min.css";
import "highlight.js/styles/atom-one-dark.css";
import "../style/temp.scss";
import "../style/card.scss";
import "../style/main.scss";
import "../style/post.scss";
// import "tui-chart/dist/tui-chart.css";
// import "highlight.js/styles/monokai-sublime.css";

import wrapper from "../store/configureStore";

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useStore((state) => state);
  const [isManage, setIsManage] = useState(false);

  const isAdminMode = useSelector((state) => state.user.isAdminMode);

  React.useEffect(() => {
    setIsManage(router.pathname.split("/")[1] === "manage");
  }, [router.pathname]);

  // React.useEffect(() => {
  //   //
  // }, []);

  React.useEffect(() => {
    function abc() {
      // alert(window.innerWidth);
      // if (isDrawer) {
      const data = { isDrawer: window.innerWidth > 600 };
      dispatch({ type: "SET_TOGGLE_IS_DRAWER_ACTION", data });
      // }
    }
    // console.log(333);
    // if (router.pathname == "/") {
    // setTimeout(
    //   () => dispatch({ type: "SET_TOGGLE_IS_DRAWER_ACTION", data }),
    //   1000
    // );
    // }
    // alert(window.innerWidth);
    window.addEventListener("resize", abc);
    // alert(window.innerWidth);
    return () => {
      window.removeEventListener("resize", abc);
    };
  }, []);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>DEV LIFE</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <Component {...pageProps} /> */}
        {isManage ? (
          <PersistGate persistor={store.__persistor}>
            <ManagerPage>
              <Component {...pageProps} />
            </ManagerPage>
          </PersistGate>
        ) : (
          <PersistGate persistor={store.__persistor}>
            <UserPage>
              <Component {...pageProps} />
            </UserPage>
          </PersistGate>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default wrapper.withRedux(MyApp);
