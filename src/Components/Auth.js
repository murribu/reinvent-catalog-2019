import React from "react";
import SignIn from "./SignIn";

class Auth extends React.Component {
  render() {
    return <SignIn {...this.props} />;
  }
}

export default Auth;
