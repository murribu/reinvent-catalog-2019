import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import handleAuthError from "./HandleAuthError";
import "./SignIn.css";
import "bootstrap/dist/css/bootstrap.css";

class SignIn extends React.Component {
  state = {
    isLoading: false,
    email: "",
    password: "",
    errorMessage: ""
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 7;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({ isLoading: true });
      await this.props.signIn(this.state.email, this.state.password);
      await this.props.loadUserIfLoggedIn();
    } catch (err) {
      this.setState({ errorMessage: handleAuthError(err) });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
          <Form.Group bs-size="large">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              autoFocus
              id="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="user@email.com"
            />
          </Form.Group>
          <Form.Group bs-size="large">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          {this.state.errorMessage !== "" ? (
            <div className="text-danger">
              <p>{this.state.errorMessage}</p>
            </div>
          ) : (
            ""
          )}
          <Button
            block
            bs-size="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <br />
          <Link className="btn btn-sm btn-primary" to="/auth/create">
            create an account
          </Link>
          <Link className="btn btn-sm btn-primary" to="/auth/forgot">
            forgot my password
          </Link>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-6 text-center">
                <Link to="/terms">Terms of Service</Link>
              </div>
              <div className="col-6 text-center">
                <Link to="/privacy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignIn;
