export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.find(d => d.name === day);

  return filteredDays ? filteredDays.appointments.filter(id => state.appointments[id]).map(id => state.appointments[id]) : []

}

export function getInterview(state, interview) {

  return interview ? {...interview, interviewer: state.interviewers[interview.interviewer]} : null

}
