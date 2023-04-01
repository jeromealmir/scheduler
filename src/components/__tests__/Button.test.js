/**
 * A test suite for the Button component.
 */

import React from "react";
import Button from "components/Button";

import { render, cleanup, fireEvent } from "@testing-library/react";

// Clean up any resources used by the test after each test
afterEach(cleanup);

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button />);
  });

  it("renders its `children` prop as text", () => {
    const { getByText } = render(<Button>Default</Button>);
    expect(getByText("Default")).toBeInTheDocument();
  });

  it("renders a default button style", () => {
    const { getByText } = render(<Button>Default</Button>);
    expect(getByText("Default")).toHaveClass("button");
  });

  it("renders a confirm button", () => {
    const { getByText } = render(<Button confirm>Confirm</Button>);
    expect(getByText("Confirm")).toHaveClass("button--confirm");
  });

  it("renders a danger button", () => {
    const { getByText } = render(<Button danger>Danger</Button>);
    expect(getByText("Danger")).toHaveClass("button--danger");
  });

  it("renders a clickable button", () => {
    // A mock function that can be used to simulate a click event.
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Clickable</Button>
    );

    const button = getByText("Clickable");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a disabled button", () => {
    // A mock function that can be used to simulate a click event.
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = getByText("Disabled");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
