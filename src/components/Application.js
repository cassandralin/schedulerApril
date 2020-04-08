import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`).then(response => {
      Promise.all([
        Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
        Promise.resolve(axios.get(`http://localhost:8001/api/appointments`))
      ]).then(all => {
        console.log(all[0]); // first
        console.log(all[1]); // second
        const [first, second] = all;
        console.log(first.data, second.data);

        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data
        }));
      });
    });
  }, []);
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {getAppointmentsForDay(state, state.day).map(appointment => {
        return (
          <Appointment id={appointment.id} time={appointment.time} interview={appointment.interview} />
        );
      })}
      <Appointment id="last" time="5pm" /> 
      </section>
    </main>
  );
}