import React from "react";
import Profile from "./Profile";

const sub = "us-east-1:ASDF-4560";
const props = {
  sub,
  profile: {
    displayName: "Donna Moss",
    email: "dmoss@whitehouse.gov"
  },
  match: {
    params: {
      id: sub.substring(10)
    }
  }
};

describe("Profile", () => {
  it("should load without crashing", () => {
    const wrapper = shallow(<Profile />);
  });
  it("should show your profile when you're logged in and viewing your profile", () => {
    const wrapper = shallow(<Profile {...props} />);
    expect(wrapper.text()).toMatch(/Your Profile/);
  });
});
