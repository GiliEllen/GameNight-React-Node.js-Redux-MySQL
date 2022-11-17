import React, { FC } from 'react'

interface GameProps {
    name: string,
    img: string
}

const Game:FC<GameProps> = ({name, img}) => {
  return (
    <div>
        <img src={img} alt="" />
        <h2>{name}</h2>
    </div>
  )
}

export default Game