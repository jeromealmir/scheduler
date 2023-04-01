/**
 * A React functional component that displays a confirmation message when a user cancels an appointment.
 * 
 * @param {Object} props - The props object containing the following properties:
 * @param {String} props.message - The message to display to the user.
 * @param {Function} props.onCancel - The function to call when the Cancel button is clicked.
 * @param {Function} props.onConfirm - The function to call when the Confirm button is clicked.
 * @returns {JSX.Element} A React component that displays a confirmation message with two buttons.
 */

import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
