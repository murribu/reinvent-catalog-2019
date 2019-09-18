import React from "react";
import { Form, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./SignIn.css";

class ForgotPassword extends React.Component {
  state = {
    email: "",
    show_new_password_fields: false,
    code: "",
    new_password: "",
    new_password_verify: "",
    error_message: "",
    success_message: ""
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmailForm = this.validateEmailForm.bind(this);
    this.validateCodeForm = this.validateCodeForm.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.show_new_password_fields) {
      try {
        await Auth.forgotPasswordSubmit(
          this.state.email,
          this.state.code,
          this.state.new_password
        );
        this.setState({
          error_message: "",
          success_message:
            "Your password has been changed. You are now being logged in!"
        });
        await Auth.signIn(this.state.email, this.state.new_password);
        this.props.history.push("/");
      } catch (err) {
        var error_message = err.message;
        this.setState({ error_message });
      }
    } else {
      try {
        await Auth.forgotPassword(this.state.email);
        this.setState({ error_message: "", show_new_password_fields: true });
      } catch (err) {
        var error_message = err.message;
        switch (err.code) {
          case "UserNotFoundException":
            error_message = "That email address was not found";
            break;
        }
        this.setState({ error_message });
      }
    }
  }

  validateEmailForm() {
    return (
      this.state.email.length > 0 &&
      this.state.email.indexOf("@") > 0 &&
      this.state.email.indexOf(".") > 0
    );
  }

  validateCodeForm() {
    return (
      this.state.code.length > 0 &&
      this.state.new_password === this.state.new_password_verify &&
      this.state.new_password.length > 7
    );
  }

  renderErrorMessage() {
    if (this.state.error_message === "") {
      return "";
    } else {
      return <div className="mt-4 text-danger">{this.state.error_message}</div>;
    }
  }

  renderForm() {
    if (this.state.show_new_password_fields) {
      return (
        <div>
          <p className="lead">
            You should have received an email with a verification code. Please
            enter it below.
          </p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label htmlFor="code">Verification Code</Form.Label>
            <Form.Control
              id="code"
              autoFocus
              type="number"
              value={this.state.code}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="code">New Password</Form.Label>
            <Form.Control
              id="new_password"
              autoFocus
              type="password"
              value={this.state.new_password}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="new_password_verify">
              Verify New Password
            </Form.Label>
            <Form.Control
              id="new_password_verify"
              autoFocus
              type="password"
              value={this.state.new_password_verify}
              onChange={this.handleChange}
            />
            <Button
              className="mt-3"
              type="submit"
              block
              bs-size="large"
              disabled={!this.validateCodeForm()}
            >
              Submit
            </Button>
            {this.renderErrorMessage()}
          </Form>
        </div>
      );
    } else {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              id="email"
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="user@email.com"
            />
          </Form.Group>
          <Button
            block
            bs-size="large"
            disabled={!this.validateEmailForm()}
            type="submit"
          >
            Submit
          </Button>
          {this.renderErrorMessage()}
        </Form>
      );
    }
  }

  render() {
    return (
      <div className="container Login">
        <h1 className="text-center mb-3">Forgot My Password</h1>
        {this.renderForm()}
      </div>
    );
  }
}

export default ForgotPassword;
