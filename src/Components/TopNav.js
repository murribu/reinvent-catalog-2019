import React from "react";
import { Auth } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

class TopNav extends React.Component {
  renderButton() {
    if (this.props.sub !== null) {
      return (
        <Button type="submit" variant="primary">
          Sign Out
        </Button>
      );
    } else {
      return (
        <NavLink className="nav-link" to="/auth">
          Sign In
        </NavLink>
      );
    }
  }

  signOut() {
    Auth.signOut();
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand className="nav-link">Dozen</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </Nav>
          <Form inline onSubmit={this.signOut}>
            <span className="mr-3">
              {this.props.sub !== null ? "Welcome " : ""}
              <NavLink
                to={
                  "/profile/" +
                  (this.props.sub ? this.props.sub.substring(10) : "")
                }
              >
                {this.props.sub !== null ? this.props.displayName : ""}
              </NavLink>
            </span>
            {this.renderButton()}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default TopNav;
