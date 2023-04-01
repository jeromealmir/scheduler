import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  test.todo("does something it is supposed to do");

  test.skip("does something else it is supposed to do", () => {});
});
