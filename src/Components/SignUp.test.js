import React from "react";
import SignUp from "./SignUp";

const signIn = jest.fn(() => Promise.resolve());

describe("SignUp", () => {
  it("should load without crashing", () => {
    const wrapper = shallow(<SignUp />);
  });
  it("should handleConfirmationSubmit success", async () => {
    const state = {
      email: "wbailey@whitehouse.gov",
      confirmationCode: "1234asdf",
      password: "malina"
    };
    const props = {
      signIn: jest.fn(() => Promise.resolve()),
      history: []
    };
    const event = {
      preventDefault: jest.fn()
    };
    const signUpComponent = shallow(<SignUp {...props} />);
    const instance = signUpComponent.instance();
    instance.setState(state);
    await instance.handleConfirmationSubmit(event);
    expect(instance.state.errorMessage).toEqual("");
    expect(event.preventDefault.mock.calls.length).toEqual(1);
    expect(props.signIn.mock.calls.length).toEqual(1);
    expect(instance.state.isLoading).toBeFalsy();
  });
  it("should handleConfirmationSubmit failure", async () => {
    const state = {
      email: "bad@email.com",
      confirmationCode: "1234asdf",
      password: "malina"
    };
    const props = {
      signIn: jest.fn(() => Promise.resolve())
    };
    const event = {
      preventDefault: jest.fn()
    };
    const signUpComponent = shallow(<SignUp {...props} />);
    const instance = signUpComponent.instance();
    instance.setState(state);
    await instance.handleConfirmationSubmit(event);
    // expect(props.signIn.mock.calls.length).toEqual(0);
    expect(instance.state.errorMessage).toEqual(
      "An account with the given email already exists"
    );
    expect(instance.state.isLoading).toBeFalsy();
  });
  it("should show renderConfirmationForm when appropriate", () => {
    const state = {
      newUser: true
    };
    const signUpComponent = shallow(<SignUp />);
    signUpComponent.setState(state);
    expect(signUpComponent.text()).toMatch(/Confirmation Code/);
  });
  it("should handleSubmit success", async () => {
    const state = {
      email: "ahayes@whitehouse.gov",
      password: "bobdole"
    };
    const event = {
      preventDefault: jest.fn()
    };
    const signUpComponent = shallow(<SignUp />);
    const instance = signUpComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(event.preventDefault.mock.calls.length).toEqual(1);
    expect(instance.state.newUser).toBeTruthy();
    expect(instance.state.errorMessage).toEqual("");
    expect(instance.state.isLoading).toBeFalsy();
  });
  it("should handleSubmit failure", async () => {
    const state = {
      email: "alreadysignedup@example.com",
      password: "bobdole"
    };
    const event = {
      preventDefault: jest.fn()
    };
    const signUpComponent = shallow(<SignUp />);
    const instance = signUpComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(event.preventDefault.mock.calls.length).toEqual(1);
    expect(instance.state.newUser).toBeFalsy();
    expect(instance.state.errorMessage).toEqual(
      "An account with the given email already exists"
    );
    expect(instance.state.isLoading).toBeFalsy();
  });
  it("should handleChange to state", () => {
    const event = {
      target: {
        id: "email",
        value: "sseaborn@whitehouse.gov"
      }
    };
    const signInComponent = shallow(<SignUp />);
    const instance = signInComponent.instance();
    instance.handleChange(event);
    expect(instance.state.email).toEqual(event.target.value);
  });
});
