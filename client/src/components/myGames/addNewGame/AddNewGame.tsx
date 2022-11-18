import { ReactEventHandler, useEffect, useState } from "react";
import axios from "axios";
import Game from "../game/Game";
import { GameModel } from './../MyGames';
import { useAppDispatch } from './../../../app/hooks';
import { login } from './../../../features/loggedInUser/userAPI';

const AddNewGame = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(login());
    }, [])

  const [gameExist, setGameExist] = useState(false);
  const [possibleGame, setPossibleGame] = useState<GameModel[]>([]);
  const [allowAdd, setAllowAdd] = useState<Boolean>(false)

  async function handleAddGame(ev:any) {
    try {
        ev.preventDefault();
        const gameName = ev.target.gameName.value;
        const gameImg = ev.target.gameImg.value;
        if(!gameName || !gameImg) throw new Error("no data from client on handleAddGame");

        const {data} = await axios.post("/api/games/Add-New-Game", {gameName, gameImg});
        console.log(data)
    } catch (error) {
        console.error(error)
    }
  }

  async function handleLookForGameName(ev: any) {
    try {
      ev.preventDefault();
      const gameName = ev.target.value;
      if(!gameName) {
        setGameExist(false);
        setPossibleGame([]);
        return;
      }
      const { data } = await axios.post("/api/games/find-game-by-name", {
        gameName,
      });
      if (!data) throw new Error("no data on /api/games/find-game-by-name");
      const { results } = data;
      if (results.length === 0) {
        console.log("no game with this name is found");
        setGameExist(false);
        setPossibleGame([]);
        setAllowAdd(true)
      } else if (results.length > 0) {
        console.log("game avilable");
        setGameExist(true);
        setPossibleGame(results);
        setAllowAdd(false)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleAddGame}>
        <input
          onChange={handleLookForGameName}
          type="text"
          name="gameName"
          placeholder="Enter Game Name Here"
        />
        <input
          type="text"
          name="gameImg"
          placeholder="Enter Game Image Link Here"
        />
        {allowAdd && <button type="submit">ADD GAME</button>}
        {!allowAdd && <button disabled type="submit">ADD GAME</button>}
      </form>
      {gameExist && <div>Did you mean...</div>}
      {gameExist &&
        possibleGame.map((game, idx) => {
          return <Game key={idx} name={game.game_name} img={game.game_img} addable={true}/>;
        })}
    </div>
  );
};

export default AddNewGame;
