import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// import RalewayWoff2 from "./fonts/raleway-regular-webfont.woff2";
// const RalewayWoff2 = require("./fonts/Raleway-Regular.ttf");

const raleway = {
  fontFamily: "Raleway",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${(
      <link
        href='https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;700&display=swap'
        rel='stylesheet'
      />
    )}) format('woff2')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Raleway, Arial",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [raleway],
      },
    },
  },
});

export default theme;
