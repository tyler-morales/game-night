import React from 'react'
import { History } from './History'
import { Leaderboard } from './Leaderboard'

export const Grid = () => {
  return (
    <div className="grid xl:grid-cols-2 gap-10">
      <Leaderboard />
      <History />
    </div>
  )
}
