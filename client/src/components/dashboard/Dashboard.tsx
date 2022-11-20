import React from 'react'
import Header from './../header/Header';
import NavBar from './../navbar/NavBar';
import ReactCalender from './../calender/ReactCalender';

function Dashboard() {
  return (
    <div>
        <Header/>
        <NavBar/>
        <div>Recent game</div>
        <div>calnder for game nights</div>
        <div>top games</div>
    </div>
  )
}

export default Dashboard