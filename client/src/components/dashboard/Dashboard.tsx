import React, { useEffect } from "react";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";
import ReactCalender from "./../calender/ReactCalender";
import { NextGame } from "./../nextGame/NextGame";
import { useAppDispatch } from "./../../app/hooks";
import { login } from "./../../features/loggedInUser/userAPI";

function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <div className="page">
      <Header />
      <NavBar />
      <div className="main">
        <NextGame />
      </div>
      <div className="top_section">
        <div>calnder for game nights</div>
      </div>
      <div className="bottom_section">top games</div>
    </div>
  );
}

export default Dashboard;
