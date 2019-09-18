import React from "react";
import SignIn from "./SignIn";

describe("SignIn", () => {
  it("should load without crashing", () => {
    const wrapper = shallow(<SignIn />);
  });
  it("should handleSubmit success", async () => {
    const props = {
      signIn: jest.fn(() => Promise.resolve),
      loadUserIfLoggedIn: jest.fn(() => Promise.resolve())
    };
    const state = {
      email: "tziegler@whitehouse.gov",
      password: "andrea"
    };
    const event = {
      preventDefault: jest.fn()
    };
    const signInComponent = shallow(<SignIn {...props} />);
    const instance = signInComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(instance.state.errorMessage).toEqual("");
    expect(props.loadUserIfLoggedIn.mock.calls.length).toEqual(1);
    expect(event.preventDefault.mock.calls.length).toEqual(1);
    expect(instance.state.loading).toBeFalsy();
  });
  it("should handleSubmit failure", async () => {
    const err = {
      code: "UserNotFoundException"
    };
    const props = {
      signIn: jest.fn(() => Promise.reject(err)),
      loadUserIfLoggedIn: jest.fn(() => Promise.resolve())
    };
    const state = {
      email: "tziegler@whitehouse.gov",
      password: "andrea"
    };
    const event = {
      preventDefault: jest.fn()
    };
    const signInComponent = shallow(<SignIn {...props} />);
    const instance = signInComponent.instance();
    instance.setState(state);
    await instance.handleSubmit(event);
    expect(props.loadUserIfLoggedIn.mock.calls.length).toEqual(0);
    expect(event.preventDefault.mock.calls.length).toEqual(1);
    expect(instance.state.errorMessage).toEqual("That user does not exist");
    expect(instance.state.loading).toBeFalsy();
  });
  it("should handleChange to state", () => {
    const event = {
      target: {
        id: "email",
        value: "sseaborn@whitehouse.gov"
      }
    };
    const signInComponent = shallow(<SignIn />);
    const instance = signInComponent.instance();
    instance.handleChange(event);
    expect(instance.state.email).toEqual(event.target.value);
  });
});
