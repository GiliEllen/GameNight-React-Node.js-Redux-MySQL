import React from 'react'
import Header from './../header/Header';
import NavBar from './../navbar/NavBar';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { GameModel } from './../myGames/MyGames';
import Game from './../myGames/game/Game';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/loggedInUser/loggedInUser';

function FindGames() {
const loggedInUser = useAppSelector(userSelector);
  const [allGamesArray, setAllgamesArray] = useState<GameModel[]>([]);
  const userId = loggedInUser?.user_id;
  async function getAllGames() {
    try {
      const {data} = await axios.post("/api/games/get-all-games-by-user", {userId});
      const {gamesArray} = data;
      setAllgamesArray(gamesArray);

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllGames();
  }, [])
  return (
    <div>
        <Header/>
        <NavBar/>
        <div>Find games to play</div>
        {allGamesArray.map((game, idx) => {return <Game key={idx} name={game.game_name} img={game.game_img} addable={game.gameAddble}/>; })}
    </div>
  )
}

export default FindGames