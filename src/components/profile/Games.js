import { useState } from 'react'

import { FiTool } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'

export const Games = () => {
  // eslint-disable-next-line no-unused-vars
  const [games, setGames] = useState(['Dominoes', 'Chess'])

  const gameItems = games.map((game, i) => {
    return (
      <div
        key={i}
        className="flex justify-between bg-primary p-4 items-center text-left rounded-lg border-2 border-white shadow-lg"
      >
        <div className="flex items-center gap-4">
          {/* TODO: Create user avatars */}
          <div className="text-primary flex items-center justify-center rounded-full text-base bg-tertiary h-12 w-12">
            {game.substring(0, 2).toUpperCase()}
          </div>
          <h3 className="text-white text-lg">{game}</h3>
        </div>
        <div className="flex gap-3">
          <FiTool className="cursor-pointer" size=".75em" />
          <RiDeleteBinLine className="cursor-pointer" size=".75em" />
        </div>
      </div>
    )
  })

  return (
    <div>
      <h2 className="text-white text-2xl text-left mb-5">Your Games</h2>
      <div className="flex flex-col gap-6">{gameItems}</div>
      <span className="cursor-pointer text-xs uppercase mt-6 block">
        + Add a new Game
      </span>
    </div>
  )
}
