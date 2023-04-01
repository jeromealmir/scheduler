/**
 * A custom hook that returns an object containing the current mode, transition function, back function,
 * save function, and delete function for an appointment.
 *
 * @param {Object} props - An object containing the appointment data.
 * @param {Object} props.interview - An object containing the interview data.
 * @param {String} props.id - The ID of the appointment.
 * @param {Function} props.bookInterview - A function to book an interview.
 * @param {Function} props.cancelInterview - A function to cancel an interview.
 * @returns {Object} - An object containing the current mode, transition function, back function, save function, and delete function.
 */

import { useVisualMode } from "hooks/useVisualMode";

export default function useAppointmentData(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? "SHOW" : "EMPTY"
  );

  /**
   * Saves an interview with the given name and interviewer to the database.
   * @param {string} name - the name of the student being interviewed
   * @param {string} interviewer - the name of the interviewer
   * @returns none
   */
  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    /**
     * If editMode is truthy, number of spots remains the same otherwise
     * it is reduced by 1.
     */
    const editMode = mode === "EDIT";

    transition("SAVING");

    try {
      await props.bookInterview(props.id, interview, editMode);
      transition("SHOW");
    } catch {
      transition("ERROR_SAVE", true);
    }
  };

  /**
   * Deletes an interview and transitions to the appropriate state.
   * @returns none
   */
  const del = async () => {
    transition("DELETING", true);

    try {
      await props.cancelInterview(props.id);
      transition("EMPTY");
    } catch (error) {
      transition("ERROR_DELETE", true);
    }
  };

  return { mode, transition, back, save, del };
}
