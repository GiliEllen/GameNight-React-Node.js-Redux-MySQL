import React from "react";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";

function MyGames() {
  return (
    <div>
      <Header />
      <NavBar />
      <div>my game list</div>
      <div>my top games</div>
      <div>add new game to list</div>
    </div>
  );
}

export default MyGames;
