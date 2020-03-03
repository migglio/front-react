import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const green1 = "#4aba7c";
const green2 = "#4aba7c";
const green3 = "#36885B";
const green4 = "#fff";

const blue1 = "#45459c";
const blue2 = "#45459c";

const theme = createMuiTheme({
  colours: {
    white: "#ffffff"
  },
  palette: {
    primary: {
      light: blue1,
      main: blue1,
      dark: blue1
    },
    secondary: {
      light: green1,
      main: green2,
      dark: green3,
      contrastText: green4
    }
  },
  typography: {
    fontFamily: '"Nunito", Helvetica, Arial, sans-serif'
  },
  textField: {
    borderColor: blue1,
    floatingLabelShrinkColor: blue2
  }
});

export default theme;
