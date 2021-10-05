import { useState, useEffect } from 'react'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'
import { Chart } from './Chart'

import { listMembers } from '../../graphql/queries'

import useLoadGames from '../../hooks/useLoadGames'
import useLoading from '../../hooks/useLoading'

export const Leaderboard = () => {
  const { loading, dataLoaded } = useLoading()
  const { games } = useLoadGames(dataLoaded)
  const [selectGameOption, setSelectGameOption] = useState(null)
  const [optionName, setOptionName] = useState()

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games])

  const Options = () => {
    const handleChange = (e) => {
      setSelectGameOption(e.target.value)
      setOptionName(e.target.value)
    }
    return (
      <select
        onChange={handleChange}
        className="ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 bg-quad rounded-md text-base text-primary px-2 py-1 w-full md:w-52"
        name="gamePlayed"
        id="game-select"
        value={optionName}
      >
        {games.map((game, index) => {
          return (
            <option key={index} value={game.id}>
              {game.name}
            </option>
          )
        })}
      </select>
    )
  }

  const fetchMemberWins = async () => {
    try {
      dataLoaded()
      // set the initial select option to the first game in the users's games
      if (!loading) setSelectGameOption(games[0].id)
      if (!loading) setOptionName(games[0].name)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <DashboardItemContainer title="Leaderboard" options={<Options />}>
        {!loading ? (
          <>
            <div className="h-80 flex flex-col gap-6">
              {listMembers.length > 0 ? (
                <Chart value={selectGameOption} />
              ) : (
                <div className="flex flex-col gap-4 bg-primary rounded-lg p-8 ">
                  <h4 className="text-2xl border-b-2 border-quad pb-4">
                    You haven't played any games to update the Leaderboard
                  </h4>
                  <p className="text-sm">
                    💡 Click the Record a Game button to record your first game!
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <LoadingRipple />
        )}
      </DashboardItemContainer>
    </>
  )
}
