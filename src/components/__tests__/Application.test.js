import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByText,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Tuesday"));

    fireEvent.click(getByText(container, "Tuesday"));

    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Leopold Silvers"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Cohana Roy"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Lydia Miller-Jones")
    ).then(() => {
      const day = getAllByTestId(container, "day").find((day) =>
        queryByText(day, "Tuesday")
      );

      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    });
  });

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});
