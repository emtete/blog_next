import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import withReduxSaga from "next-redux-saga";
import { useSelector } from "react-redux";

// import AppLayout from "../components/AppLayout";
import UserPage from "../components/AppLayout/UserPage";
import ManagerPage from "../components/AppLayout/ManagerPage";
import "codemirror/lib/codemirror.css";
import "highlight.js/styles/github.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-editor/dist/tui-editor.min.css";
import "tui-editor/dist/tui-editor-contents.min.css";
import "highlight.js/styles/atom-one-dark.css";
import "./temp.scss";
import "./card.scss";
// import "highlight.js/styles/monokai-sublime.css";

import wrapper from "../store/configureStore";

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const isAdminMode = useSelector((state) => state.user.isAdminMode);

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
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {isAdminMode ? (
          <ManagerPage>
            <Component {...pageProps} />
          </ManagerPage>
        ) : (
          <UserPage>
            <Component {...pageProps} />
          </UserPage>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default wrapper.withRedux(withReduxSaga(MyApp));
