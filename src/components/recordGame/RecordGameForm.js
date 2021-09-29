import { useState } from 'react'

import { Formik, Field, Form } from 'formik'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { API } from 'aws-amplify'

import { createRecordGame } from '../../graphql/mutations'
import { updateMember } from '../../graphql/mutations'

import { GameOption } from '../recordGame/GameOption'
import { PlayerCheckbox } from '../recordGame/PlayerCheckbox'
import { WinnerCheckbox } from '../recordGame/WinnerCheckbox'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

import useLoadGames from '../../hooks/useLoadGames'
import useLoadMembers from '../../hooks/useLoadMembers'
import useUser from '../../hooks/useUser'

import {
  RecordGameValues,
  RecordGameSchema,
} from '../../formik/RecordGameValidation'
import { RecordGameErrors } from '../errors/RecordGameErrors'

export const RecordGameForm = () => {
  let history = useHistory()

  const [loading, updateLoading] = useState(true)
  const { games } = useLoadGames(updateLoading)
  const { members } = useLoadMembers(updateLoading)
  const { user } = useUser()

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

  const [checkedStatus, setCheckedStatus] = useState(members.map(() => false))
  const [checkedWinnerStatus, setCheckedWinnerStatus] = useState(
    members.map(() => false)
  )

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

      API.graphql({
        query: createRecordGame,
        variables: { input: recordGameInfo },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      history.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  const updateWinner = async (values) => {
    const { gamePlayed } = values

    try {
      await API.graphql({
        query: updateMember,
        variables: {
          input: {
            id: '38dfc4cd-6d8c-4f3b-8cb4-8bd2998e8a1d',
            name: 'Patrick Star',
          },
        },
      })

      console.log('Updated wins succesfully')

      // fetchMembers()
    } catch (err) {
      console.error(err)
    }
  }

  // Rendered Game Options
  const gamesOptions = games.map((game, index) => (
    <GameOption key={index} game={game} index={index} />
  ))

  // Render All Players
  const playerCheckboxes = members.map((player, index) => (
    <PlayerCheckbox
      key={index}
      player={player}
      index={index}
      checkedStatus={checkedStatus}
      checkboxStatus={checkboxStatus}
    />
  ))

  // Render All Possible winners
  const winnerCheckboxes = members.map((player, index) => (
    <WinnerCheckbox
      key={index}
      player={player}
      index={index}
      checkedWinnerStatus={checkedWinnerStatus}
      checkedStatus={checkedStatus}
      checkboxStatus={checkboxStatus}
    />
  ))

  const renderErrors = (errors, touched, type) => {
    return <RecordGameErrors errors={errors} touched={touched} type={type} />
  }

  return (
    <Formik
      initialValues={RecordGameValues}
      validationSchema={RecordGameSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        setSubmitting(false)
        addGameToDB(values)
        // updateWinner(values)
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
              <option value="">{loading ? 'Loading' : 'Select Game'}</option>
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
  )
}
