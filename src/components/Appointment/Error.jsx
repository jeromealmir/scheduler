/**
 * A React component that displays an error message if an HTTP request failed.
 * 
 * @param {Object} props - The props object containing the following properties:
 * @param {String} props.message - The error message to display.
 * @param {Function} props.onClose - The function to call when the close button is clicked.
 * @returns {JSX.Element} A React component that displays an error message with a close button.
 */

import React from "react";

export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}
