import React from "react";
import { FC } from "react";

interface GameNightRowProps {
  GameName: string;
  playingOn: Date;
  playingIn: string;
  address: string;
  hostedByname: string;
  hostedBylastName: string;
  spots: number;
  addable: boolean
}

export const GameNightRow: FC<GameNightRowProps> = ({
  GameName,
  playingOn,
  playingIn,
  address,
  hostedByname,
  hostedBylastName,
  spots,
  addable
}) => {
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
      {addable && <td><button>JOIN GAME</button></td>}
      {!addable && <td><button disabled>JOIN GAME</button></td>}
    </tr>
  );
};
