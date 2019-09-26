import Amplify from "aws-amplify";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Authenticator } from "aws-amplify-react/dist/Auth";

// First party
import AppWithAuth from "./AppWithAuth";
import configureStore, { history } from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import * as constants from "./constants";

// Root styles
import "./index.css";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: constants.PRIMARY_COLOR
    },
    secondary: {
      main: constants.SECONDARY_COLOR
    }
  }
});

const renderApp = () => {
  render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <AppWithAuth history={history} />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};

if (process.env.NODE_ENV !== "production" && (module as any).hot) {
  (module as any).hot.accept("./AppWithAuth", renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
