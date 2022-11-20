import React from "react";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";
import {FullCalendarReact} from "../calender/fullCalender/FullCalender";

function MyGameNights() {
  return (
    <div>
      <Header />
      <NavBar />
      <div>your next game is...</div>
      <div>calnder for game nights</div>
      <div>Schdual new game here</div>
      <FullCalendarReact/>
    </div>
  );
}

export default MyGameNights;
