import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import Header from "./../header/Header";
import NavBar from "./../navbar/NavBar";
import axios from "axios";
import Game from "./game/Game";

function MyGames() {
  const loggedInUser = useAppSelector(userSelector);
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    getUserGames();
  }, []);

  async function getUserGames() {
    try {
      const { data } = await axios.post("/api/games/find-game-by-user", {
        loggedInUser,
      });
      if (!data) throw new Error("no data from serever");
      const {results} = data
      setGames(results);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header />
      <NavBar />
      <div>
        <h3>my game list</h3>
        <div>
        {games.map(game => { return (<Game name={game.game_name} img={game.game_img} />)})}
        </div>
      </div>
      <div>my top games</div>
      <div>add new game to list</div>
    </div>
  );
}

export default MyGames;
