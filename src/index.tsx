import Amplify from "aws-amplify";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// First party
import App from "./App";
import configureStore, { history } from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import * as constants from "./constants";

import { default as config } from "./config";

// Root styles
import "./index.css";

Amplify.configure({
  Auth: {
    identityPoolId: config.aws.identitypoolid,
    region: config.aws.cognitoregion,
    userPoolId: config.aws.userpoolid,
    userPoolWebClientId: config.aws.webclientid
  },
  API: {
    aws_appsync_graphqlEndpoint: config.aws.apiurl,
    aws_appsync_region: "us-east-1",
    aws_appsync_authenticationType: "AWS_IAM"
  },
  aws_appsync_graphqlEndpoint: config.aws.apiurl,
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AWS_IAM"
});

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
        <App history={history} />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};

if (process.env.NODE_ENV !== "production" && (module as any).hot) {
  (module as any).hot.accept("./App", renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
