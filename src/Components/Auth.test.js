import React from "react";
import Auth from "./Auth";

describe("Auth", () => {
  it("should load without crashing", () => {
    const wrapper = shallow(<Auth />);
  });
});
