/**
 * A reusable button component that can be used throughout the application.
 *
 * @param {Object} props - The props object that contains the button's properties.
 * @param {string} props.children - The text to display inside the button.
 * @param {boolean} props.confirm - A boolean that determines if the button is a confirmation button.
 * @param {boolean} props.danger - A boolean that determines if the button is a danger button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {boolean} props.disabled - A boolean that determines if the button is disabled.
 * @returns A button element with the specified properties.
 */

import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  let buttonClass = classNames("button", {
    " button--confirm": props.confirm,
    " button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
}
