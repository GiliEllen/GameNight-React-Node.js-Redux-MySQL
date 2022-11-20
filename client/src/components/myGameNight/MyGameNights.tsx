import React from "react";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";
import {FullCalenderReact} from "../calender/fullCalender/FullCalender";
import Calendar from '../calender/ReactCalender';
import { AddEvent } from './../addEvent/AddEvent';
import { NextGame } from './../nextGame/NextGame';

function MyGameNights() {
  return (
    <div>
      <Header />
      <NavBar />
      <div>your next game is...</div>
      <NextGame/>
      <div>calnder for game nights</div>
      <FullCalenderReact/>
      <div>Schdual new game here</div>
      <AddEvent/>
    </div>
  );
}

export default MyGameNights;
