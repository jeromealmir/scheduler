/**
 * A test suite for the DayListItem component.
 */

import React from "react";
import DayListItem from "components/DayListItem";
import { render, cleanup } from "@testing-library/react";

// Clean up any resources used by the test after each test
afterEach(cleanup);

describe("DayListItem", () => {
  it("renders without crashing", () => {
    render(<DayListItem />);
  });

  it("renders 'no spots remaining' when there are 0 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={0} />);
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  it("renders '1 spot remaining' when there is 1 spot", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={1} />);
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });

  it("renders '2 spots remaining' when there are 2 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={2} />);
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });
});
