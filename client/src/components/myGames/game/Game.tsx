import axios from 'axios'
import React, { FC, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { userSelector } from '../../../features/loggedInUser/loggedInUser'

interface GameProps {
    name: string,
    img: string,
    addable: boolean
}

const Game:FC<GameProps> = ({name, img, addable}) => {
  const [disabled, setDisabled] = useState<boolean>(false)
  const loggedInUser = useAppSelector(userSelector);
  const userId = loggedInUser?.user_id

  async function handleAddGameToList(ev:any) {
    try {
      const {data} = await axios.post("/api/games/add-game-to-user", {name, userId});
      const {results} = data;
      if(results.affectedRows > 0) {
        console.log("game added good!");
        setDisabled(true)
      } else {
        console.log("did not work")
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
        <img src={img} alt="" />
        <h2>{name}</h2>
        {addable && <h3>Would you like to add this game to your owned game list?</h3>}
        {!disabled && addable && <button onClick={handleAddGameToList}>ADD</button>}
        {disabled && addable && <button disabled onClick={handleAddGameToList}>ADD</button>}
    </div>
  )
}

export default Game