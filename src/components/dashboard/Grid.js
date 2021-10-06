import { GameDistribution } from './GameDistribution'
import { GameActivity } from './GameActivity'
import { History } from './History'
import { Leaderboard } from './Leaderboard'

export const Grid = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-10">
        <Leaderboard />
        <History />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-10">
        <GameDistribution />
        <div className="col-span-1 xl:col-span-2">
          <GameActivity />
        </div>
      </div>
    </div>
  )
}
