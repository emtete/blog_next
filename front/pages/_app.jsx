import React, { useState } from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import { useRouter } from "next/router";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

import { useSelector } from "react-redux";

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
import "tui-chart/dist/tui-chart.css";
// import "highlight.js/styles/monokai-sublime.css";

import wrapper from "../store/configureStore";

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [isManage, setIsManage] = useState(false);

  const isAdminMode = useSelector((state) => state.user.isAdminMode);

  React.useEffect(() => {
    setIsManage(router.pathname.split("/")[1] === "manage");
  }, [router.pathname]);

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
        <meta name='description' content={"웹 개발 블로그입니다."} />
        <meta property='og:title' content={"DEV LIFE"} />
        <meta property='og:description' content={"웹 개발 블로그입니다."} />
        <meta property='og:image' content={"https://i.imgur.com/OCGRjWh.png"} />
        <meta property='og:url' content={"https://dev-life.kr"} />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <Component {...pageProps} /> */}
        {isManage ? (
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

export default wrapper.withRedux(MyApp);
