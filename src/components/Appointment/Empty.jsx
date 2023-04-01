/**
 * A React component that displays an "Add" button when there is no existing appointment.
 * 
 * @param {Object} props - The props object containing the following properties:
 * @param {Function} props.onAdd - The function to call when the "Add" button is clicked.
 * @returns {JSX.Element} A React component that displays an "Add" button.
 */

import React from "react";

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
