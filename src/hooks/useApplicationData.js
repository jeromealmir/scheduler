import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) { 

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));

  const findDayID = (day) => {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }

    return days[day]
  }
  
  const dayID = findDayID(state.day);

  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = {
      ...state.days[dayID],
      spots: {...state.days[dayID]}.spots - 1
    };
  
    days[dayID] = day;
    
    const days = state.days;

  return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => setState(prev => ({...prev, appointments, days})))

  }
  
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = {
      ...state.days[dayID],
      spots: {...state.days[dayID]}.spots + 1
    };

    days[dayID] = day;
    
    const days = state.days;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments, days})))

  }

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
 
  }, []);

  return { state, setDay, bookInterview, cancelInterview}
}
