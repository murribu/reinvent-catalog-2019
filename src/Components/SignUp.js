import React from "react";
import { Form } from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "./LoaderButton";
import HandleAuthError from "./HandleAuthError";
import "./SignIn.css";

class SignUp extends React.Component {
  state = {
    isLoading: false,
    first_name: "",
    last_name: "",
    organization: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    newUser: null,
    errorMessage: ""
  };

  validateForm() {
    return (
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0 &&
      this.state.organization.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          "custom:first_name": this.state.first_name,
          "custom:last_name": this.state.last_name,
          "custom:organization": this.state.organization
        }
      });
      this.setState({
        newUser
      });
      this.setState({ errorMessage: "" });
    } catch (e) {
      this.setState({ errorMessage: HandleAuthError(e) });
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await this.props.signIn(this.state.email, this.state.password);
      this.props.history.push("/");
    } catch (e) {
      this.setState({ errorMessage: HandleAuthError(e) });
    }
    this.setState({ isLoading: false });
  };

  renderConfirmationForm() {
    return (
      <Form onSubmit={this.handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" bs-size="large">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <p>Please check your email for the code.</p>
        </Form.Group>
        <LoaderButton
          block
          bs-size="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </Form>
    );
  }

  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={this.state.first_name}
            onChange={this.handleChange}
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={this.state.last_name}
            onChange={this.handleChange}
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group controlId="organization">
          <Form.Label>Organization Name</Form.Label>
          <Form.Control
            value={this.state.organization}
            onChange={this.handleChange}
            placeholder="Organization Name"
          />
        </Form.Group>
        <Form.Group controlId="email" bs-size="large">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="user@example.com"
          />
        </Form.Group>
        <Form.Group controlId="password" bs-size="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" bs-size="large">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={this.state.confirmPassword}
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
        <LoaderButton
          block
          bs-size="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </Form>
    );
  }

  render() {
    return (
      <div className="Login">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}

export default SignUp;
