import axios from "axios";
import React, { useState } from "react";
import { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { userSelector } from "../../../features/loggedInUser/loggedInUser";

interface GameNightRowProps {
  GameName: string;
  playingOn: Date;
  playingIn: string;
  address: string;
  hostedByname: string;
  hostedBylastName: string;
  spots: number;
  addable: boolean;
  gameEventsId: number
}

export const GameNightRow: FC<GameNightRowProps> = ({
  GameName,
  playingOn,
  playingIn,
  address,
  hostedByname,
  hostedBylastName,
  spots,
  addable,
  gameEventsId
}) => {
    const loggedInUser = useAppSelector(userSelector)
    const [addedUser, setAddedUser] = useState<boolean>()
  const day = new Date(playingOn).getDate();
  const month = new Date(playingOn).getMonth();
  const year = new Date(playingOn).getFullYear();
  const hour = new Date(playingOn).getHours();
  const minutes = new Date(playingOn).getMinutes();
  let minutesFinal;
  if (minutes < 10) {
    minutesFinal = `0${minutes}`;
  } else {
    minutesFinal = minutes;
  }

  async function handleAddUserToGameEvent() {
    try {
        const userId = loggedInUser?.user_id
        const {data} = await axios.post("/api/game-nights/add-user-to-game-night", {userId, gameEventsId})
        const {results} = data;
        if(results.affectedRows > 0) setAddedUser(true)
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <tr>
      <td>{GameName}</td>
      <td>{`${day}.${month}.${year} at ${hour}:${minutesFinal}`}</td>
      <td>{playingIn}</td>
      <td>{address}</td>
      <td>
        {hostedByname} {hostedBylastName}
      </td>
      <td>{spots}</td>
      {!addedUser && addable && <td><button onClick={handleAddUserToGameEvent}>JOIN GAME</button></td>}
      {addedUser && addable && <td><button disabled onClick={handleAddUserToGameEvent}>JOIN GAME</button></td>}
      {!addable && <td><button disabled>JOIN GAME</button></td>}
    </tr>
  );
};
