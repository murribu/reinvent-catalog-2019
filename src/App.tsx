import React, { Component } from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import {
  withAuthenticator,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  RequireNewPassword,
  TOTPSetup,
  SignUp
} from "aws-amplify-react";
import { Authenticator } from "aws-amplify-react/dist/Auth";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AWS from "aws-sdk";
import { API, Auth } from "aws-amplify";
import makeRoutes from "./routes";
import AuthLogo from "./components/AuthLogo";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import Alert from "./components/Alert";
import { fetchFlags, fetchMyProfile } from "./redux/actions";
import * as constants from "./constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import config from "./config";

const drawerWidth = 240;
const styles = (theme: any) => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing.unit
    }
  },
  toolbar: theme.mixins.toolbar,
  loadingContainer: {
    display: "flex",
    position: "absolute" as "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 1300,
    backgroundColor: "white"
  },
  loading: {
    height: "100px",
    display: "flex"
  },
  loadingTitle: {
    fontSize: "24px",
    fontWeight: 300,
    position: "relative" as "relative",
    marginTop: "5px",
    marginLeft: "20px"
  }
});

interface AppProps {
  history: History;
  authState: string;
  authData: any;
  classes: any;
  dispatch: any;
}

interface RegisterAttributes {
  email: string;
  password: string;
}

interface AppState {
  loading: boolean;
  drawerOpen: boolean;
  mobileDrawerOpen: boolean;
  afterRegisterAttributes: RegisterAttributes;
}

class App extends Component<AppProps, AppState> {
  setAfterRegisterAttributes(values: RegisterAttributes) {
    this.setState({ afterRegisterAttributes: values });
  }

  getAfterRegisterAttributes() {
    return this.state.afterRegisterAttributes;
  }

  groups: any[] = [];
  Routes: any;

  state: AppState = {
    loading: true,
    drawerOpen: false,
    mobileDrawerOpen: false,
    afterRegisterAttributes: {
      email: "",
      password: ""
    }
  };

  authAWS(authData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      AWS.config.region = "us-east-1";
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: String(config.aws.identitypoolid),
        Logins: {
          [`cognito-idp.us-east-1.amazonaws.com/${
            config.aws.userpoolid
          }`]: authData.signInUserSession.idToken.jwtToken
        }
      });

      (AWS.config.credentials as AWS.CognitoIdentityCredentials).get(
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(AWS.config.credentials);
          }
        }
      );
    });
  }

  async componentWillMount() {
    const { authData } = this.props;
    this.Routes = makeRoutes();

    const authAws = await this.authAWS(authData);
    console.log(authAws);

    this.props.dispatch(fetchMyProfile());

    this.setState({ loading: false });
  }

  async signOut() {
    await Auth.signOut();
  }

  render() {
    const { classes, authData, authState } = this.props;
    const { loading } = this.state;

    return (
      <ConnectedRouter history={this.props.history}>
        <div className={classes.root}>
          <CssBaseline />
          {loading && (
            <div className={classes.loadingContainer}>
              <div className={classes.loading}>
                <CircularProgress />
                <span className={classes.loadingTitle}>Authenticating...</span>
              </div>
            </div>
          )}
          <NavBar
            authData={authData}
            authState={authState}
            drawerOpen={this.state.drawerOpen}
            toggleDrawer={() =>
              this.setState((state: AppState) => ({
                drawerOpen: !state.drawerOpen
              }))
            }
            toggleMobileDrawer={() =>
              this.setState((state: AppState) => ({
                mobileDrawerOpen: !state.mobileDrawerOpen
              }))
            }
          />
          <Menu
            open={this.state.drawerOpen}
            mobileOpen={this.state.mobileDrawerOpen}
            onDrawerClose={() =>
              this.setState((state: AppState) => ({
                mobileDrawerOpen: false,
                drawerOpen: false
              }))
            }
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <this.Routes />
          </main>
        </div>
      </ConnectedRouter>
    );
  }
}

// const requestError = 'Request timeout';

// function requestWithTimeout(promise: any) {
//   let didTimeout = false;

//   return new Promise(function (resolve, reject) {
//     const timeout = setTimeout(() => {
//       didTimeout = true;
//       reject(new Error(requestError));
//     }, 100);

//     promise
//         .then((response: any) => {
//           // If timedout, do nothing.
//           if (didTimeout) {
//             return;
//           }

//           // Resolve any response
//           console.log('RESPONSE: promise response in requestWithTimeout', response);
//           resolve(response);
//         })
//         .catch((err: any) => {
//           // If timedout, do nothing.
//           if (didTimeout) {
//             return;
//           }

//           // Reject any errors
//           console.log('ERROR: promise error in requestWithTimeout', err);
//           reject(err);
//         })
//         .finally(() => {
//           // Clear the timeout as cleanup
//           if (timeout) {
//             clearTimeout(timeout);
//           }
//         });
//   });
// }

// const originalGraphql = API.graphql;

// API.graphql = (operation: any) => {
//   return requestWithTimeout(originalGraphql.bind(API)(operation))
//     .catch(error => {
//       if (error.message === requestError) {
//         console.log('timeout happened');
//       }

//       // Re-throw error so downstream promise handlers can run
//       throw error;
//     });
// };

const connectedApp = connect()(App);
const customTheme = {
  button: {
    backgroundColor: constants.PRIMARY_COLOR
  },
  a: {
    color: constants.SECONDARY_COLOR
  },
  formSection: {
    fontFamily: "Roboto"
  }
};

export default withStyles(styles)(connectedApp);
