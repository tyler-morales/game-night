import React, { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { Dashboard } from '../layout/Dashboard'

import protectedRoute from './protectedRoute'

import { listGames } from '../graphql/queries'

const loadedPlayers = [
  { name: 'Pupa' },
  { name: 'Korvo' },
  { name: 'Jesse' },
  { name: 'Terry' },
  { name: 'Gobblins' },
]

function RecordGame() {
  const [games, updateGames] = useState([])
  const [loading, updateLoading] = useState(true)

  const [checkedState, setCheckedState] = useState(
    new Array(loadedPlayers.length).fill(false)
  )

  let playingPlayers = []
  for (var index in checkedState) {
    if (checkedState[index] === true) {
      playingPlayers.push(loadedPlayers[index])
    }
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((player, index) =>
      index === position ? !player : player
    )

    setCheckedState(updatedCheckedState)
  }

  useEffect(() => {
    // checkUser()
    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchGames = async () => {
    try {
      let gameData = await API.graphql({
        query: listGames,
        variables: { limit: 100 },
      })

      updateLoading(false)

      let allGames = gameData.data.listGames.items
      setFilteredGames(allGames)
    } catch (err) {
      console.error(err)
    }
  }

  const setFilteredGames = async (allGames) => {
    const { username } = await Auth.currentAuthenticatedUser()
    const myGameData = allGames.filter((p) => p.owner === username)

    updateGames(myGameData)
  }

  const gamesOptions = games.map((game, index) => (
    <option key={index} value={game.name} className="rounded-md">
      {game.name}
    </option>
  ))

  return (
    <Dashboard>
      <h1>Record a Game</h1>
      <div className="mt-8 flex flex-col gap-3 bg-primary p-5 md:p-8 text-left rounded-lg shadow-lg w-full md:w-96 m-auto">
        <form className="flex flex-col gap-4">
          {/* Game Played */}
          <div className="flex flex-col gap-3">
            <label className="text-lg text-left" htmlFor="game-select">
              What did you play?
            </label>
            <select
              className="ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 mt-3 bg-quad rounded-md text-base text-primary py-2 px-4"
              name="games"
              id="game-select"
            >
              <option value="">{loading ? 'Loading' : 'Select Game'}</option>
              {gamesOptions}
            </select>
          </div>

          {/* Game Players */}
          <div>
            <label className=" text-lg text-left" htmlFor="players">
              Who Played?
            </label>
            <div className="flex flex-wrap gap-4 mt-3">
              {loadedPlayers.map((player, index) => {
                return (
                  <div key={index} className="flex gap-2">
                    <label htmlFor={player.name} className="cursor-pointer">
                      <input
                        type="checkbox"
                        id={player.name}
                        name={player.name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                        className="opacity-0 cursor-pointer hidden"
                      />
                      <span
                        className={`py-1 px-2 rounded-md transition-all border-2 border-quad text-base ${
                          checkedState[index]
                            ? 'bg-quad text-primary'
                            : 'bg-transparent'
                        }`}
                      >
                        {player.name}
                      </span>
                    </label>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Winners */}
          <div>
            <label className=" text-lg text-left" htmlFor="winner">
              Who Won?
            </label>
            <div className="flex wrap gap-4 mt-3">
              <div className="flex gap-2">
                <input type="checkbox" id="pupa" name="pupa" />
                <label className="text-base" htmlFor="pupa">
                  Pupa
                </label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="korvo" name="korvo" />
                <label className="text-base" htmlFor="korvo">
                  Korvo
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button className="w-full transition-all ring-offset-primary ring-offset-2 focus:ring-tertiary focus:outline-none focus:ring-2 text-lg rounded-md py-2 px-4 text-primary bg-tertiary mt-5">
            Record Game
          </button>
        </form>
      </div>
      {/* {user === null ? <div>Loading...</div> : <span></span>} */}
    </Dashboard>
  )
}

export default protectedRoute(RecordGame)
