import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'

import { createRecordGame } from '../graphql/mutations'

import { API } from 'aws-amplify'

import { Dashboard } from '../layout/Dashboard'

import { LoadingRipple } from '../components/loadingIndicator/LoadingRipple'

import useLoadMembers from '../hooks/useLoadMembers'
import useLoadGames from '../hooks/useLoadGames'
import useUser from '../hooks/useUser'

import protectedRoute from './protectedRoute'

import { RecordGameSchema } from '../formik/RecordGameValidation'

import '../styles/checkboxStyles.css'

// const RecordGameSchema = Yup.object().shape({
//   gamePlayed: Yup.string().required('Required'),
//   players: Yup.array().min(2),
//   winners: Yup.array().min(1),
// })

function RecordGame() {
  let history = useHistory()
  const [loading, updateLoading] = useState(true)

  const { members } = useLoadMembers(updateLoading)
  const { games } = useLoadGames(updateLoading)
  const { user } = useUser()

  const [checkedStatus, setCheckedStatus] = useState(members.map(() => false))
  const [checkedWinnerStatus, setCheckedWinnerStatus] = useState(
    members.map(() => false)
  )

  const checkboxStatus = (index, type) => {
    let state

    switch (type) {
      case 'PLAYERS':
        state = [...checkedStatus]
        state[index] = !checkedStatus[index]
        setCheckedStatus(state)
        break
      case 'WINNERS':
        state = [...checkedWinnerStatus]
        state[index] = !checkedWinnerStatus[index]
        setCheckedWinnerStatus(state)
        break
      default:
        break
    }
  }

  const addGameToDB = (values) => {
    try {
      const recordGameID = uuid()
      const { gamePlayed, players, winners } = values

      const recordGameInfo = {
        id: recordGameID,
        name: gamePlayed,
        players: players,
        winners: winners,
        owner: user.username,
        type: 'RecordGame',
      }

      // API.graphql({
      //   query: createRecordGame,
      //   variables: { input: recordGameInfo },
      //   authMode: 'AMAZON_COGNITO_USER_POOLS',
      // })
      // history.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  // Rendered Game Options
  const gamesOptions = games.map((game, index) => (
    <option key={index} value={game.name} className="rounded-md">
      {game.name}
    </option>
  ))

  // Render All Players
  const playerCheckboxes = members.map((player, index, errors) => {
    return (
      <div key={index} className="wrapper">
        <Field
          type="checkbox"
          onClick={() => checkboxStatus(index, 'PLAYERS')}
          id={player.name}
          name="players"
          value={player.name}
        />
        <label
          htmlFor={player.name}
          className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base cursor-pointer ${
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
          onClick={() => checkboxStatus(index, 'WINNERS')}
          id={player.id}
          name="winners"
          value={player.name}
          disabled={!checkedStatus[index]}
        />
        <label
          htmlFor={player.id}
          className={`block h-full py-1 px-2 rounded-md transition-all border-2 border-quad text-base ${
            checkedWinnerStatus[index]
              ? 'bg-quad text-primary'
              : 'bg-transparent'
          } ${
            !checkedStatus[index]
              ? 'opacity-40 cursor-not-allowed'
              : 'cursor-pointer'
          }`}
        >
          {player.name}
        </label>
      </div>
    )
  })

  const renderErrors = (errors, touched, type) => {
    let responses = {
      gamePlayed: 'Please select a game',
      players: 'Please select at least two players',
      winners: 'Please select at least one winner',
    }

    return errors[type] && touched[type] ? (
      <div className="text-sm text-error">🚨 {responses[type]}</div>
    ) : null
  }

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
            validationSchema={RecordGameSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false)
              addGameToDB(values)
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-4">
                {/* Game Played */}
                <div className="flex flex-col gap-3">
                  <label className="text-lg text-left" htmlFor="game-select">
                    What did you play?
                  </label>
                  <Field
                    component="select"
                    className="ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 bg-quad rounded-md text-base text-primary py-2 px-4"
                    name="gamePlayed"
                    id="game-select"
                  >
                    <option value="">
                      {loading ? 'Loading' : 'Select Game'}
                    </option>
                    {gamesOptions}
                  </Field>
                  {renderErrors(errors, touched, 'gamePlayed')}
                </div>

                {/* Game Players */}
                <div className="flex flex-col gap-3">
                  <label className=" text-lg text-left">Who Played?</label>
                  <div
                    role="group"
                    aria-labelledby="checkbox-group"
                    className="flex flex-wrap gap-4"
                  >
                    {loading ? <LoadingRipple /> : playerCheckboxes}
                  </div>
                  {renderErrors(errors, touched, 'players')}
                </div>

                {/* Winners */}
                <div className="flex flex-col gap-3">
                  <label className=" text-lg text-left" htmlFor="winners">
                    Who Won?
                  </label>
                  <div
                    role="group"
                    aria-labelledby="checkbox-group"
                    className="flex flex-wrap gap-4"
                  >
                    {loading ? <LoadingRipple /> : winnerCheckboxes}
                  </div>
                  {renderErrors(errors, touched, 'winners')}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full transition-all ring-offset-primary ring-offset-2 focus:ring-tertiary focus:outline-none focus:ring-2 text-lg rounded-md py-2 px-4 text-primary bg-tertiary mt-5"
                >
                  Record Game
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Dashboard>
  )
}

export default protectedRoute(RecordGame)
