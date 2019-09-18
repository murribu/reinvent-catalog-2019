import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import SignUp from "./SignUp";
import Profile from "./Profile";
import ForgotPassword from "./ForgotPassword";

const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      childProps.sub !== null ? (
        <C {...rProps} {...childProps} />
      ) : (
        <Redirect
          to={`/auth?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

const AuthRoute = ({ render: C, props: childProps, ...rest }) => {
  return childProps.sub !== null ? (
    <Route
      path="/auth"
      component={({ location }) => {
        return (
          <Redirect
            to={{
              pathname: `${
                location.search.substring(1).split("=").length > 1
                  ? location.search.substring(1).split("=")[1]
                  : `/`
              }`
            }}
          />
        );
      }}
    />
  ) : (
    <Route {...rest} render={rProps => <C {...rProps} {...childProps} />} />
  );
};

const ProppedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route {...rest} render={rProps => <C {...rProps} {...childProps} />} />
);

const Routes = ({ childProps }) => (
  <Switch>
    <ProppedRoute exact path="/" render={Home} props={childProps} />
    <AuthRoute exact path="/auth" render={Auth} props={childProps} />
    <AuthRoute exact path="/auth/create" render={SignUp} props={childProps} />
    <AuthRoute
      exact
      path="/auth/forgot"
      render={ForgotPassword}
      props={childProps}
    />
    <ProppedRoute
      exact
      path="/profile/:id"
      render={Profile}
      props={childProps}
    />
  </Switch>
);

export default Routes;
