import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { createStore } from "redux";

import reducers from "./reducers";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { purple, red, deepOrange } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    primaryBackdrop: {
      main: purple[100],
    },
    secondary: {
      main: red[900],
    },
    error: {
      main: deepOrange[900],
    },
  },
});

const myStore = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={myStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
