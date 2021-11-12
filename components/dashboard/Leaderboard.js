import { useState, useEffect } from 'react'

import { DashboardItemContainer } from '../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'
import { EmptyTileInfo } from '../layout/EmptyTileInfo'
import { Chart } from './Chart'

import useLoadGames from '../../hooks/useLoadGames'

export const Leaderboard = () => {
  const [games, setGames] = useState([])
  const { data, loading } = useLoadGames()

  const [selectGameOption, setSelectGameOption] = useState('')
  const [optionName, setOptionName] = useState('')

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, games])

  const fetchMemberWins = async () => {
    try {
      let games = (await data) ?? []
      setGames(games)

      // set the initial select option to the first game in the users's games
      if (!loading) setSelectGameOption(await games[0].id)
      if (!loading) setOptionName(await games[0].name)
    } catch (err) {
      console.error(err)
    }
  }

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
        {games.length === 0 && <option>No data</option>}
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

  return (
    <DashboardItemContainer title="Leaderboard" options={<Options />}>
      {!loading ? (
        <div className="h-80 flex flex-col gap-6">
          {data.length !== 0 ? (
            <Chart value={selectGameOption} />
          ) : (
            <EmptyTileInfo icon="📊" name="Leaderboard" />
          )}
        </div>
      ) : (
        <LoadingRipple />
      )}
    </DashboardItemContainer>
  )
}
