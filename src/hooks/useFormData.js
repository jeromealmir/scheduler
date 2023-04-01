/**
 * A custom React hook that manages the state of a form.
 *
 * @param {Object} props - The props object containing the initial state of the form.
 * @param {string} props.student - The initial value of the student name input.
 * @param {Object} props.interviewer - The initial value of the interviewer select input.
 * @param {Function} props.onCancel - The function to call when the cancel button is clicked.
 * @param {Function} props.onSave - The function to call when the save button is clicked.
 * @returns {Object} - An object containing the current state of the form, as well as functions to update and validate the form.
 */

import { useState } from "react";

export default function useFormData(props) {
  const [state, setState] = useState({
    student: props.student || "",
    interviewer: props.interviewer || null,
    error: "",
  });

  /**
   * Sets the corresponding values in the state object.
   * @param {*} value
   */
  const setStudent = (value) =>
    setState((prev) => ({ ...prev, student: value }));
  const setInterviewer = (value) =>
    setState((prev) => ({ ...prev, interviewer: value }));
  const setError = (value) => setState((prev) => ({ ...prev, error: value }));

  /**
   * Resets the state of the component by setting the student to an empty string and the interviewer to null.
   */
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  /**
   * Calls the reset function and the onCancel prop when the user cancels the appointment.
   */
  const cancel = () => {
    reset();
    props.onCancel();
  };

  /**
   * Validates the student name and interviewer selection before calling the onSave function.
   * If the student name is blank or the interviewer is not selected, an error message is set.
   */
  const validate = () => {
    if (state.student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (state.interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(state.student, state.interviewer);
  };

  return { state, setStudent, setInterviewer, cancel, validate };
}
