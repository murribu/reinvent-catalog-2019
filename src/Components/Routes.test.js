import React from "react";
import Routes from "./Routes";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import App from "../App";

const loggedInProps = {
  handleUserSignOut: jest.fn(),
  sub: "ASDF-4562",
  profile: {
    displayName: "CJ Craig",
    email: "ccraig@whitehouse.gov"
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

describe("Routes Component", () => {
  it("when logged in, should show Home component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]} {...loggedInProps}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
  });
});
