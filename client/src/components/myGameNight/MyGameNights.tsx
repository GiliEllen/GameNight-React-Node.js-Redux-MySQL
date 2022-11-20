import React from "react";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";
import {FullCalenderReact} from "../calender/fullCalender/FullCalender";
import Calendar from '../calender/ReactCalender';
import { AddEvent } from './../addEvent/AddEvent';

function MyGameNights() {
  return (
    <div>
      <Header />
      <NavBar />
      <AddEvent/>
      <div>your next game is...</div>
      <div>calnder for game nights</div>
      <div>Schdual new game here</div>
      <FullCalenderReact/>
    </div>
  );
}

export default MyGameNights;
