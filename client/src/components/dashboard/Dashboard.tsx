import React from 'react'
import Header from './../header/Header';
import NavBar from './../navbar/NavBar';

function Dashboard() {
  return (
    <div>
        <Header/>
        <NavBar/>
        <div>your next game is...</div>
        <div>calnder for game nights</div>
        <div>top games</div>
    </div>
  )
}

export default Dashboard