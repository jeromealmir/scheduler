/**
 * A component that represents an individual interviewer in a list of interviewers.
 *
 * @param {Object} props - The props object that contains the interviewer's information.
 * @param {String} props.avatar - The URL of the interviewer's avatar image.
 * @param {String} props.name - The name of the interviewer.
 * @param {Boolean} props.selected - A boolean indicating whether or not the interviewer is selected.
 * @param {Function} props.setInterviewer - A function that sets the selected interviewer.
 * @returns {JSX.Element} A React component that displays an interviewer's avatar and name.
 */

import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
