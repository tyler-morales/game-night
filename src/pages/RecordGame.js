import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import { Dashboard } from '../layout/Dashboard'

import { LoadingRipple } from '../components/loadingIndicator/LoadingRipple'

import useLoadMembers from '../hooks/useLoadMembers'
import useLoadGames from '../hooks/useLoadGames'
import useUser from '../hooks/useUser'

import protectedRoute from './protectedRoute'

function RecordGame() {
  const [loading, updateLoading] = useState(true)

  const { members } = useLoadMembers(updateLoading)
  const { games } = useLoadGames(updateLoading)
  const { user } = useUser()

  const [checkedStatus, setCheckedStatus] = useState(members.map(() => false))

  const handleSetChecked = async (index) => {
    let newState = [...checkedStatus] // make a copy of the current state of the checkedStatus
    newState[index] = !checkedStatus[index] // update the relevant index based on the previous state. If its checked, uncheck it and vice versa.
    setCheckedStatus(newState)
  }
  console.log(checkedStatus)

  // Rendered elements
  const gamesOptions = games.map((game, index) => (
    <option key={index} value={game.name} className="rounded-md">
      {game.name}
    </option>
  ))

  const playerCheckboxes = members.map((player, index) => {
    return (
      <div
        key={index}
        className="rounded-md ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 flex gap-2"
      >
        <label htmlFor={player.name} className="cursor-pointer">
          <Field
            type="checkbox"
            onClick={() => handleSetChecked(index)}
            id={player.name}
            name="players"
            value={player.name}
            className="opacity-0 cursor-pointer hidden"
          />
          <span
            className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base ${
              checkedStatus[index] ? 'bg-quad text-primary' : 'bg-transparent'
            }`}
          >
            {player.name}
          </span>
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
                <label className=" text-lg text-left" htmlFor="players">
                  Who Played?
                </label>
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
