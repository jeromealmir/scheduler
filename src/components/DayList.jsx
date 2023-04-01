/**
 * A component that displays a list of DayListItem components.
 *
 * @param {Object} props - The props object that contains the days array and the onChange function.
 * @param {Array} props.days - An array of day objects that contain the name and spots properties.
 * @param {string} props.value - The currently selected day.
 * @param {function} props.onChange - A function that sets the currently selected day.
 * @returns A list of DayListItem components.
 */

import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const daysArr = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });
  return <ul>{daysArr}</ul>;
}
