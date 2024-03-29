/**
 * This file contains a series of tests for the Application component. The tests
 * cover a range of functionality, including selecting a day, booking an interview,
 * cancelling an interview, editing an interview, and handling errors when saving
 * or deleting appointments.
 */

import React from "react";
import Application from "components/Application";
import axios from "axios";

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

// Clean up any resources used by the test after each test
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
    const { container } = render(<Application />);

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add")).then(() => {
      const day = getAllByTestId(container, "day").find((day) =>
        queryByText(day, "Monday")
      );

      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    });
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Joe Miller" },
    });

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Joe Miller")).then(
      () => {
        const day = getAllByTestId(container, "day").find((day) =>
          queryByText(day, "Monday")
        );

        expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
      }
    );
  });

  it("shows the save error when failing to save an appointment", async () => {
    // Mocks a rejected Axios PUT request for testing purposes.
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Joe Miller" },
    });

    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => getByText(appointment, "Error")).then(() => {
      expect(
        getByText(appointment, "Server Error. Could not save changes.")
      ).toBeInTheDocument();
    });
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // Mocks a rejected response for a DELETE request using Axios.
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error")).then(() => {
      expect(
        getByText(appointment, "Server Error. Could not delete appointment.")
      ).toBeInTheDocument();
    });
  });
});
