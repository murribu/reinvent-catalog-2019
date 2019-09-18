import React from "react";
import ForgotPassword from "./ForgotPassword";

describe("ForgotPassword", () => {
  it("should load without crashing", () => {
    const wrapper = shallow(<ForgotPassword />);
  });
  it("should handleChange to state", () => {
    const event = {
      target: {
        id: "email",
        value: "sseaborn@whitehouse.gov"
      }
    };
    const signInComponent = shallow(<ForgotPassword />);
    const instance = signInComponent.instance();
    instance.handleChange(event);
    expect(instance.state.email).toEqual(event.target.value);
  });
  it("should handleSubmit (email) success", async () => {
    const state = {
      email: "username@example.com",
      show_new_password_fields: false,
      code: "",
      new_password: "",
      new_password_verify: ""
    };
    const event = {
      preventDefault: jest.fn()
    };
    const forgotPasswordComponent = shallow(<ForgotPassword />);
    const instance = forgotPasswordComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(instance.state.show_new_password_fields).toBeTruthy();
  });
  it("should handleSubmit (bad email) failure", async () => {
    const state = {
      email: "bademail@example.com",
      show_new_password_fields: false,
      code: "",
      new_password: "",
      new_password_verify: ""
    };
    const event = {
      preventDefault: jest.fn()
    };
    const forgotPasswordComponent = shallow(<ForgotPassword />);
    const instance = forgotPasswordComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(instance.state.show_new_password_fields).toBeFalsy();
    expect(instance.state.error_message).toEqual(
      "That email address was not found"
    );
  });
  it("should handleSubmit (new password) success", async () => {
    const state = {
      email: "username@example.com",
      show_new_password_fields: true,
      code: "123456",
      new_password: "asdfasdf",
      new_password_verify: "asdfasdf"
    };
    const event = {
      preventDefault: jest.fn()
    };
    const props = {
      history: []
    };
    const forgotPasswordComponent = shallow(<ForgotPassword {...props} />);
    const instance = forgotPasswordComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(instance.state.success_message).toEqual(
      "Your password has been changed. You are now being logged in!"
    );
    expect(instance.state.error_message).toEqual("");
  });
  it("should handleSubmit (new password) failure", async () => {
    const state = {
      email: "username@example.com",
      show_new_password_fields: true,
      code: "111111",
      new_password: "asdfasdf",
      new_password_verify: "asdfasdf"
    };
    const event = {
      preventDefault: jest.fn()
    };
    const forgotPasswordComponent = shallow(<ForgotPassword />);
    const instance = forgotPasswordComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(instance.state.success_message).toEqual("");
    expect(instance.state.error_message).toEqual(
      "Invalid verification code provided, please try again."
    );
  });
});
