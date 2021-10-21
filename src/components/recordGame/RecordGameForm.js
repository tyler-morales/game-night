import { useState, useEffect, useRef } from 'react'

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
import { SelectAll } from '../recordGame/SelectAll'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

import useLoadGames from '../../hooks/useLoadGames'
import useLoadMembers from '../../hooks/useLoadMembers'
import useUser from '../../hooks/useUser'

import {
  RecordGameValues,
  RecordGameSchema,
} from '../../formik/RecordGameValidation'
import { RecordGameErrors } from '../errors/RecordGameErrors'

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import '../../styles/dayPicker.css'

export const RecordGameForm = () => {
  let history = useHistory()
  const [games, setGames] = useState([])
  const [members, setMembers] = useState([])
  const [checked, setChecked] = useState(false)
  const { data, loading } = useLoadGames()
  const { memberData, membersLoading } = useLoadMembers([])
  const { user } = useUser()
<<<<<<< HEAD
  const [date, setDate] = useState(new Date())
  const formikRef = useRef();
=======
  const formikRef = useRef()
>>>>>>> 3fc5966ea4956de52d92bc5dd2e9d6fde55f3846

  const modifiers = {
    today: new Date(),
    selectedDay: date,
  };

  const modifiersStyles = {
    today: {
      color: "#5cd5dd",
      backgroundColor: "",
    },
    selectedDay: {
      color: "#000022",
      backgroundColor: "#5cd5dd",
    },
  };

  

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, memberData])

  useEffect(() => {
    setCheckedStatus(members.map(() => checked))

    if (formikRef.current) {
      formikRef.current.setFieldValue(
        'players',
        checked
          ? members.map((member, index) => `${member.id},${member.name}`)
          : []
      )
    }
  }, [checked, members])

  const fetchData = async () => {
    try {
      let records = (await data) ?? []
      let loadedMembers = (await memberData) ?? []
      setGames(records)
      setMembers(loadedMembers)
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
        createdAt: date.toISOString(),
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

      // 4. Loop over the players array to get every losers ID and name
      const losers = players.filter((player) => {
        return !winners
          .map((winner) => winner.split(',')[1])
          .includes(player.name)
      })

      // 5. Loop over the winners array to get every winners ID and name
      winners = winners.map((winner) => {
        const winnerObjects = {
          id: winner.split(',')[0],
          name: winner.split(',')[1],
        }
        return winnerObjects
      })

      // 6. Loop over every winner and loser and update their plays
      loopOverLosersAndWinners(gameId, gamePlayedName, winners, 'wins')
      loopOverLosersAndWinners(gameId, gamePlayedName, losers, 'loses')
    } catch (err) {
      console.error(err)
    }
  }

  // Loop over winners and loosers
  const loopOverLosersAndWinners = (
    gameId,
    gamePlayedName,
    playerType,
    outcome
  ) => {
    playerType.forEach(async ({ id }) => {
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
        const totalCount = memberPlays.data.getMember.Plays.items.filter(
          (game) => game.gameId.includes(gameId)
        )[0][outcome]

        updatePlayer(playId, totalCount, outcome)
      } else {
        // winner has not won this game before; create a new Win
        createPlayRecord(
          id,
          gameId,
          gamePlayedName,
          user.username,
          'Play',
          outcome
        )
      }
    })
  }

  // Create a Play record
  const createPlayRecord = async (
    playerId,
    gameId,
    gameName,
    username,
    type,
    playType
  ) => {
    await API.graphql({
      query: createPlay,
      variables: {
        input: {
          playMemberId: playerId, // Member ID
          gameId,
          name: gameName,
          owner: username,
          [playType]: 1, // Set initial count to 1
          type,
        },
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
  }

  // Update the Play record for the player (win or loss)
  const updatePlayer = async (id, numOfWinsOrLoses, type) => {
    try {
      await API.graphql({
        query: updatePlay,
        variables: {
          input: {
            id, // Play ID
            [type]: (numOfWinsOrLoses += 1), // Increment wins or loses by 1
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
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

  const renderErrors = (errors, touched, type) => (
    <RecordGameErrors errors={errors} touched={touched} type={type} />
  )

  return (
    <Formik
      initialValues={RecordGameValues}
      validationSchema={RecordGameSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        createMemberPlay(values)
        addGameToDB(values)
      }}
      innerRef={formikRef}
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
              className="focus-quad-ring bg-quad rounded-md text-base text-primary py-2 px-4"
              name="gamePlayed"
              id="game-select"
            >
              {loading ? (
                <option>Loading</option>
              ) : games.length === 0 ? (
                <option>No games added</option>
              ) : (
                <option>Select a game</option>
              )}
              {gamesOptions}
            </Field>
            {renderErrors(errors, touched, 'gamePlayed')}
          </div>

          {/* Game Players */}
          <div className="flex flex-row gap-3 justify-between">
            <label className=" text-lg text-left">Who Played?</label>
            <div>
              <SelectAll {...{ checked, setChecked }} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-wrap gap-4"
            >
              {membersLoading ? (
                <LoadingRipple />
              ) : playerCheckboxes.length === 0 ? (
                <span className="text-base text-center w-full text-secondary">
                  ⚠️&nbsp; No added players: Add some in your settings
                </span>
              ) : (
                playerCheckboxes
              )}
            </div>
            {renderErrors(errors, touched, 'players')}
          </div>

          {/* Winners */}
          <div className="flex flex-col gap-3">
            {members.length !== 0 && (
              <>
                <label className=" text-lg text-left" htmlFor="winners">
                  Who Won?
                </label>
              </>
            )}

            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-wrap gap-4"
            >
              {membersLoading ? <LoadingRipple /> : winnerCheckboxes}
            </div>
            {renderErrors(errors, touched, 'winners')}
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-3">
            <DayPicker
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              onDayClick={(day) => {setDate(day)}}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-lg rounded-md py-2 px-4 text-primary bg-tertiary mt-5 focus-tertiary-ring"
          >
            Record Game
          </button>
        </Form>
      )}
    </Formik>
  )
}
