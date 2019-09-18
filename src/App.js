import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes";
import TopNav from "./Components/TopNav";

import Amplify, { Auth } from "aws-amplify";
import config from "./config";

export class App extends React.Component {
  state = {
    sub: null,
    profile: {
      email: null,
      displayName: null
    }
  };

  signIn = async (username, password) => {
    var user = await Auth.signIn(username, password);
    await this.loadUserIfLoggedIn();
    return { result: "success" };
  };

  async loadUserIfLoggedIn() {
    try {
      var { attributes } = await Auth.currentAuthenticatedUser();
      var sub = attributes.sub;
      this.setState({ sub });
    } catch (e) {
      if (e !== "not authenticated") {
        throw e;
      }
    }
  }

  componentDidMount() {
    Amplify.configure({
      Auth: {
        userPoolId: config.aws.userpoolid,
        region: config.aws.cognitoregion,
        identityPoolId: config.aws.identitypoolid,
        userPoolWebClientId: config.aws.webclientid
      }
    });
    this.loadUserIfLoggedIn();
  }

  render() {
    const childProps = {
      profile: this.state.profile,
      sub: this.state.sub,
      signIn: this.signIn,
      loadUserIfLoggedIn: this.loadUserIfLoggedIn
    };
    return (
      <div className="App">
        <TopNav {...childProps} />
        <Routes childProps={childProps} />
      </div>
    );
  }
}

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default () => <AppWithRouter />;
