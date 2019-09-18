import React from "react";
import TopNav from "./TopNav";

const loggedInProps = {
  handleUserSignOut: jest.fn(),
  sub: "ASDF-4561",
  profile: {
    displayName: "Josh Lymon",
    email: "jlymon@whitehouse.gov"
  }
};

const loggedOutProps = {
  handleUserSignOut: jest.fn(),
  sub: null,
  profile: {
    displayName: null,
    email: null
  }
};

describe("TopNav Component", () => {
  it("should load without crashing", () => {
    const wrapper = shallow(<TopNav />);
  });
  it("when logged in, should show 'welcome'", () => {
    const wrapper = shallow(<TopNav {...loggedInProps} />);
    expect(wrapper.text()).toMatch(/Welcome/);
  });
  it("when logged out, should not show 'welcome'", () => {
    const wrapper = shallow(<TopNav {...loggedOutProps} />);
    expect(wrapper.text()).not.toMatch(/Welcome/);
  });
});
