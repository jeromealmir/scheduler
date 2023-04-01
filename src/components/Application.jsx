/**
 * The Application component is the main component for the Interview Scheduler app.
 * It renders the DayList and Appointment components, and uses the useApplicationData hook
 * to manage the state of the app.
 * 
 * @param {{object}} props - The props object passed down to the component.
 * @returns {JSX.Element} A React component that renders the Interview Scheduler app.
 */

import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, appointments, getLastTime } =
    useApplicationData();

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time={getLastTime} />
      </section>
    </main>
  );
}
