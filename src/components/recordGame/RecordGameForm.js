import { useState, useEffect } from 'react'

import { Formik, Field, Form } from 'formik'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { API } from 'aws-amplify'

import {
  createPlay,
  updatePlay,
  createRecordGame,
} from '../../graphql/mutations'

import { getMember } from '../../graphql/queries'

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

  const [games, setGames] = useState([])
  const [members, setMembers] = useState([])
  const { data, loading } = useLoadGames()
  const { memberData, membersLoading } = useLoadMembers([])
  const { user } = useUser()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, memberData])

  const fetchData = async () => {
    try {
      let records = (await data) ?? []
      let loadedMembers = (await memberData) ?? []
      setGames(records)
      setMembers(loadedMembers)

      // console.log(members)
    } catch (err) {
      console.error(err)
    }
  }

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
        name: gamePlayed.split(',')[1],
        players: players.map((player) => player.split(',')[1]), // split the array of players with ID's and names to just names
        winners: winners.map((winner) => winner.split(',')[1]), // split the array of players with ID's and names to just ID's
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

  const createMemberPlay = async (values) => {
    try {
      // 1. Destructure values from the Record a Game form
      let { gamePlayed, winners, players } = values

      // 2. set the game played ID and name
      const gameId = gamePlayed.split(',')[0]
      const gamePlayedName = gamePlayed.split(',')[1]

      // 3. Loop over the players array to get every players ID and name
      players = players.map((player) => {
        const playerObjects = {
          id: player.split(',')[0],
          name: player.split(',')[1],
        }
        return playerObjects
      })

      // 3. Loop over the players array to get every losers ID and name
      const losers = players.filter((player) => {
        return !winners
          .map((winner) => winner.split(',')[1])
          .includes(player.name)
      })

      // 4. Loop over the winners array to get every winners ID and name
      winners = winners.map((winner) => {
        const winnerObjects = {
          id: winner.split(',')[0],
          name: winner.split(',')[1],
        }
        return winnerObjects
      })

      losers.forEach(async ({ id, name }) => {
        // get all gameId's from the winner
        const memberPlays = await API.graphql({
          query: getMember,
          variables: { id },
        })

        // Get the ID of every game the user has played & push it into an array of ID's
        const gameIds = memberPlays.data.getMember.Plays.items.map(
          ({ gameId }) => gameId
        )

        // Check if the player has played the game
        if (gameIds.includes(gameId)) {
          // player already won the same game; no need to create a new record; update the record instead
          // Find the Play ID
          const playId = memberPlays.data.getMember.Plays.items.filter((game) =>
            game.gameId.includes(gameId)
          )[0].id

          // Get current loses for the specified game
          const totalLoses = memberPlays.data.getMember.Plays.items.filter(
            (game) => game.gameId.includes(gameId)
          )[0].loses

          updateLoser(playId, totalLoses, name)
        } else {
          // winner has not won this game before; create a new Win
          await API.graphql({
            query: createPlay,
            variables: {
              input: {
                playMemberId: id, // Member ID
                gameId,
                name: gamePlayedName,
                owner: user.username,
                loses: 1, // Set initial loses to 1 (because they won!!!)
                type: 'Play',
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          })
          console.log('Created ' + gamePlayedName + ' for ' + name)
        }
      })

      winners.forEach(async ({ id, name }) => {
        // get all gameId's from the winner
        const memberPlays = await API.graphql({
          query: getMember,
          variables: { id },
        })

        // Get the ID of every game the user has played & push it into an array of ID's
        const gameIds = memberPlays.data.getMember.Plays.items.map(
          ({ gameId }) => gameId
        )

        // Check if the player has played the game
        if (gameIds.includes(gameId)) {
          // player already won the same game; no need to create a new record; update the record instead
          // Find the Play ID
          const playId = memberPlays.data.getMember.Plays.items.filter((game) =>
            game.gameId.includes(gameId)
          )[0].id

          // Get current wins for the specified game
          const totalWins = memberPlays.data.getMember.Plays.items.filter(
            (game) => game.gameId.includes(gameId)
          )[0].wins

          updateWinner(playId, totalWins, name)
        } else {
          // winner has not won this game before; create a new Win
          await API.graphql({
            query: createPlay,
            variables: {
              input: {
                playMemberId: id, // Member ID
                gameId,
                name: gamePlayedName,
                owner: user.username,
                wins: 1, // Set initial wins to 1 (because they won!!!)
                type: 'Play',
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          })
          console.log('Created ' + gamePlayedName + ' for ' + name)
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  const updateLoser = async (id, loses, name) => {
    loses += 1
    try {
      // Update the Win with the corresponding winner
      await API.graphql({
        query: updatePlay,
        variables: {
          input: {
            id, // Win ID
            loses: loses, // Increment wins by 1
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      console.log('Updated ' + name + ' succesfully')
    } catch (err) {
      console.error(err)
    }
  }

  const updateWinner = async (id, wins, name) => {
    wins += 1
    try {
      // Update the Win with the corresponding winner
      await API.graphql({
        query: updatePlay,
        variables: {
          input: {
            id, // Win ID
            wins: wins, // Increment wins by 1
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      console.log('Updated ' + name + ' succesfully')
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
        setSubmitting(false)
        createMemberPlay(values)
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
              {membersLoading ? <LoadingRipple /> : playerCheckboxes}
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
              {membersLoading ? <LoadingRipple /> : winnerCheckboxes}
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
