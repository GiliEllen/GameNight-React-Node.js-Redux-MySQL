import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import Calendar from "../calender/ReactCalender";
import { useState, useEffect } from "react";
import { GameModel } from "./../myGames/MyGames";
import axios from "axios";
import { login } from './../../features/loggedInUser/userAPI';
import { useAppDispatch } from './../../app/hooks';

export const AddEvent = () => {
  const loggedInUser = useAppSelector(userSelector);
  const [games, setGames] = useState<GameModel[]>([]);
  const [date, setDate] = useState(new Date());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login());
    getUserGames();
  }, []);

  async function getUserGames() {
    try {
      const { data } = await axios.post("/api/games/find-game-by-user", {
        loggedInUser,
      });
      if (!data) throw new Error("no data from serever");
      const { results } = data;
      setGames(results);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddEvent(ev: any) {
    try {
      ev.preventDefault();
      const eventDateDay = date.getDate();
      const eventDateMonth = date.getMonth() + 1;
      const eventDateYear = date.getFullYear();
      const userId = loggedInUser?.user_id;
      const eventTime = ev.target.eventTime.value;
      const eventLocationCity = ev.target.location.value;
      const eventLocationAddress = ev.target.address.value;
      const eventSpots = ev.target.spots.value;
      const SelectedGameId = ev.target.elements.gamesList.value;

      const { data } = await axios.post("/api/game-nights/add-event", {
        eventDateDay,
        eventDateMonth,
        eventDateYear,
        eventTime,
        eventLocationCity,
        eventLocationAddress,
        eventSpots,
        SelectedGameId,
        userId
      });
      const {results} = data;
      console.log(results)

      if(results.affectedRows > 0) console.log("new event added")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleAddEvent}>
        <Calendar setDate={setDate} date={date} />
        <input type="time" name="eventTime" />
        <input
          type="text"
          name="location"
          placeholder="Enter Game Location City"
        />
        <input
          type="text"
          name="address"
          placeholder="Enter Game Location Address"
        />
        <input type="number" name="spots" placeholder="Enter Avilable Spots" />
        <label htmlFor="gamesList">Choose from your games:</label>
        <select name="gamesList">
          {games.map((game, idx) => {
            return (
              <option key={idx} value={game.game_id}>
                {game.game_name}
              </option>
            );
          })}
        </select>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};
