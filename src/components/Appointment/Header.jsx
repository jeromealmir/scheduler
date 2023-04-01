/**
 * A React component that displays the time of an appointment.
 *
 * @param {Object} props - The props object containing the following property:
 * @param {String} props.time - The time of the appointment to display.
 * @returns {JSX.Element} - A header element containing the time of the appointment.
 */

import React from "react";

export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
