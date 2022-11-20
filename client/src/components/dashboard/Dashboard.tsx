import React from 'react'
import Header from './../header/Header';
import NavBar from './../navbar/NavBar';
import ReactCalender from './../calender/ReactCalender';
import { NextGame } from './../nextGame/NextGame';

function Dashboard() {
  return (
    <div>
        <Header/>
        <NavBar/>
        <NextGame/>
        <div>calnder for game nights</div>
        <div>top games</div>
    </div>
  )
}

export default Dashboard