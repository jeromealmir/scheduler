/**
 * A component that represents a single day in the DayList component.
 *
 * @param {object} props - The props object that contains the following properties:
 * @param {string} props.name - The name of the day.
 * @param {number} props.spots - The number of spots available on the day.
 * @param {boolean} props.selected - The boolean indicating whether the day is currently selected
 * @param {function} props.setDay - A function to set the currently selected day
 * @returns {JSX.Element} - A React component that displays a single day in the list of available days.
 */

import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = () => {
    if (props.spots === 0) return "no spots remaining";

    if (props.spots === 1) return "1 spot remaining";

    return `${props.spots} spots remaining`;
  };

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      data-testid="day"
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
