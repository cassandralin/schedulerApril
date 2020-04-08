export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  if (!state.days.map(item => item.name).includes(day)) return [];
  const filteredDays = state.days.filter(element => element.name === day)[0]
    .appointments;
  const filteredAppointments = filteredDays.map(id => state.appointments[id]);
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
  if (!interview.interviewer) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
  }
}