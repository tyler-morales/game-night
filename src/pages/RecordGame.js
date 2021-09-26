import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import { Dashboard } from '../layout/Dashboard'

import { LoadingRipple } from '../components/loadingIndicator/LoadingRipple'

import useLoadMembers from '../hooks/useLoadMembers'
import useLoadGames from '../hooks/useLoadGames'
import useUser from '../hooks/useUser'

import protectedRoute from './protectedRoute'

import './checkboxStyles.css'

function RecordGame() {
  const [loading, updateLoading] = useState(true)

  const { members } = useLoadMembers(updateLoading)
  const { games } = useLoadGames(updateLoading)
  const { user } = useUser()

  const [checkedStatus, setCheckedStatus] = useState(members.map(() => false))
  const [checkedWinnerStatus, setCheckedWinnerStatus] = useState(
    members.map(() => false)
  )

  const checkPlayers = async (index) => {
    let newState = [...checkedStatus] // make a copy of the current state of the checkedStatus
    newState[index] = !checkedStatus[index] // update the relevant index based on the previous state. If its checked, uncheck it and vice versa.
    setCheckedStatus(newState)
  }

  const checkWinners = async (index) => {
    let newState = [...checkedWinnerStatus]
    newState[index] = !checkedWinnerStatus[index]
    setCheckedWinnerStatus(newState)
  }

  console.log(checkedStatus, checkedWinnerStatus)

  // Rendered Game Options
  const gamesOptions = games.map((game, index) => (
    <option key={index} value={game.name} className="rounded-md">
      {game.name}
    </option>
  ))

  // Render All Players
  const playerCheckboxes = members.map((player, index) => {
    return (
      <div key={index} className="wrapper">
        <Field
          type="checkbox"
          onClick={() => checkPlayers(index)}
          id={player.name}
          name="players"
          value={player.name}
        />
        <label
          htmlFor={player.name}
          className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base ${
            checkedStatus[index] ? 'bg-quad text-primary' : 'bg-transparent'
          }`}
        >
          {player.name}
        </label>
      </div>
    )
  })

  // Render All Possible winners
  const winnerCheckboxes = members.map((player, index) => {
    return (
      <div key={index} className="wrapper">
        <Field
          type="checkbox"
          onClick={() => checkWinners(index)}
          id={player.id}
          name="winners"
          value={player.name}
        />
        <label
          htmlFor={player.id}
          className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base ${
            checkedWinnerStatus[index]
              ? 'bg-quad text-primary'
              : 'bg-transparent'
          }`}
        >
          {player.name}
        </label>
      </div>
    )
  })

  return (
    <Dashboard>
      <h1>Record a Game</h1>
      {user === null ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8 flex flex-col gap-3 bg-primary p-5 md:p-8 text-left rounded-lg shadow-lg w-full md:w-96 m-auto">
          <Formik
            initialValues={{
              gamePlayed: '',
              players: [],
              winners: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}
          >
            <Form className="flex flex-col gap-4">
              {/* Game Played */}
              <div className="flex flex-col gap-3">
                <label className="text-lg text-left" htmlFor="game-select">
                  What did you play?
                </label>
                <Field
                  component="select"
                  className="ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 mt-3 bg-quad rounded-md text-base text-primary py-2 px-4"
                  name="gamePlayed"
                  id="game-select"
                >
                  <option value="">
                    {loading ? 'Loading' : 'Select Game'}
                  </option>
                  {gamesOptions}
                </Field>
              </div>

              {/* Game Players */}
              <div>
                <label className=" text-lg text-left">Who Played?</label>
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  className="flex flex-wrap gap-4 mt-3"
                >
                  {loading ? <LoadingRipple /> : playerCheckboxes}
                </div>
              </div>

              {/* Winners */}
              <div>
                <label className=" text-lg text-left" htmlFor="winners">
                  Who Won?
                </label>
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  className="flex flex-wrap gap-4 mt-3"
                >
                  {loading ? <LoadingRipple /> : winnerCheckboxes}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full transition-all ring-offset-primary ring-offset-2 focus:ring-tertiary focus:outline-none focus:ring-2 text-lg rounded-md py-2 px-4 text-primary bg-tertiary mt-5"
              >
                Record Game
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </Dashboard>
  )
}

export default protectedRoute(RecordGame)
