// Returns an array of appointments for a given day.
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((d) => d.name === day);

  return filteredDays
    ? filteredDays.appointments
        .filter((id) => state.appointments[id])
        .map((id) => state.appointments[id])
    : [];
}

// Returns an array of interviewers for a given day.
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((d) => d.name === day);

  return filteredDays
    ? filteredDays.interviewers
        .filter((id) => state.interviewers[id])
        .map((id) => state.interviewers[id])
    : [];
}

// Returns an interview object with the interviewer information added to it.
export function getInterview(state, interview) {
  return interview
    ? { ...interview, interviewer: state.interviewers[interview.interviewer] }
    : null;
}
