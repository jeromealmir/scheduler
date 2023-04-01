/**
 * A custom hook that manages the state and logic for the Interview Scheduler application.
 *
 * @returns An object containing the state, setDay function, appointments, and getLastTime function.
 */

import React from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const findDayID = (day) => {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };

    return days[day];
  };

  const dayID = findDayID(state.day);

  /**
   * Books an interview for a given appointment ID and updates the state with the new appointment and day information.
   * @param {number} id - The ID of the appointment to book.
   * @param {Object} interview - The interview object containing the student name and interviewer ID.
   * @param {boolean} [editMode=false] - Whether to update the spots count if the appointment is being edited. Default value: false
   * @returns {Promise} A promise that resolves with the updated state after the appointment has been booked.
   */
  const bookInterview = async (id, interview, editMode = false) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const day = {
      ...state.days[dayID],
      spots: editMode
        ? { ...state.days[dayID] }.spots
        : { ...state.days[dayID] }.spots - 1,
    };

    const days = state.days;

    days[dayID] = day;

    await axios.put(`/api/appointments/${id}`, { interview });
    return setState((prev) => ({ ...prev, appointments, days }));
  };

  /**
   * Cancels an interview for a given appointment ID and updates the state with the new appointment and day information.
   * @param {number} id - The ID of the appointment to cancel.
   * @returns {Promise} A promise that resolves with the updated state after the appointment has been cancelled.
   */
  const cancelInterview = async (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const day = {
      ...state.days[dayID],
      spots: { ...state.days[dayID] }.spots + 1,
    };

    const days = state.days;

    days[dayID] = day;

    await axios.delete(`/api/appointments/${id}`);
    return setState((prev) => ({ ...prev, appointments, days }));
  };

  const interviewers = getInterviewersForDay(state, state.day);

  /**
   * Returns an array of Appointment components for the given day.
   * @param {Object} state - The state object containing the appointments and interviews.
   * @param {string} state.day - The selected day.
   * @param {Function} bookInterview - The function to book an interview.
   * @param {Function} cancelInterview - The function to cancel an interview.
   * @param {Array} interviewers - The array of interviewers.
   * @returns {Array} - An array of Appointment components.
   */
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          interviewers={interviewers}
        />
      );
    }
  );

  /**
   * Finds the last appointment time in the given array of appointments.
   * @param {Array} appointments - An array of appointment objects.
   * @returns {string} The last appointment time in the format of "Xpm".
   */
  const getLastTime = appointments
    .filter((appointment) => appointment.props && appointment.props.time)
    .map(
      (appointment) => `${parseInt(appointment.props.time.slice(0, -2)) + 1}pm`
    )
    .pop();

  /**
   * Fetches data from the API and updates the state with the response.
   * Runs once when the component mounts.
   */
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, appointments, getLastTime };
}
