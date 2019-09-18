import React from "react";
import Home from "./Home";

describe("Home", () => {
  it("should load without crashing", () => {
    const wrapper = shallow(<Home />);
  });
});
