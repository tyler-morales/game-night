import React from 'react'
import { GameDistribution } from './GameDistribution'
import { History } from './History'
import { Leaderboard } from './Leaderboard'

export const Grid = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid xl:grid-cols-2 gap-10">
        <Leaderboard />
        <History />
      </div>
      <div className="grid xl:grid-cols-3 gap-10">
        <GameDistribution />
      </div>
    </div>
  )
}
