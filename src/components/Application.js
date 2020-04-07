import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";

export default function Application(props) {
  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "3pm",
      interview: {
        student: "Cassandra Lin",
        interviewer: {
          id: 1,
          name: "Tori Malcolm",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }
  ];
  
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`).then(response => {
      console.log(response.data);
      setDays(response.data);
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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointments.map(appointment => {
        return (
          <Appointment id={appointment.id} time={appointment.time} interview={appointment.interview} />
        );
      })}
      <Appointment id="last" time="5pm" /> 
      </section>
    </main>
  );
}