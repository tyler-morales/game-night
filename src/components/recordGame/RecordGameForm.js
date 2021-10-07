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
    /*
    An object with 3 keys:  String: gamePlayed
                            Array: players: [String]
                            Array: winners: [String]
                            
    values: 
      {
        gamePlayed: "4c090a5e-91ef-416b-83bc-ee02b6817b01,Clue"
        players: Array(3) [ "80b81f08-f690-4b0a-b4fd-fe57ce70563e,Pedro", "457d598d-1fe7-486a-9f71-b20d8727eb93,Tyler", "dd833e0c-da73-42e9-8f93-6ca9cc73d90b,Travis" ]
        winners: Array [ "dd833e0c-da73-42e9-8f93-6ca9cc73d90b,Travis ", "457d598d-1fe7-486a-9f71-b20d8727eb93,Tyler" ]
      }

    */
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

      // 4. Loop over the winners array to get every winners ID and name
      winners = winners.map((winner) => {
        const winnerObjects = {
          id: winner.split(',')[0],
          name: winner.split(',')[1],
        }
        return winnerObjects
      })

      // const winnerId = winners.map((winner) => winner.split(',')[0])
      // const winnerName = winners.map((winner) => winner.split(',')[1])

      winners.forEach(async ({ id, name }) => {
        // get all gameId's from the winner
        let memberPlays = await API.graphql({
          query: getMember,
          variables: { id },
        })

        // Get the ID of every game the user has played & push it into an array of ID's
        let gameIds = memberPlays.data.getMember.Plays.items.map(
          ({ gameId }) => gameId
        )

        // Check if the player has played the game
        if (gameIds.includes(gameId)) {
          // player already won the same game; no need to create a new record; update the record instead
          // Find the Play ID
          let playId = memberPlays.data.getMember.Plays.items.filter((game) =>
            game.gameId.includes(gameId)
          )

          playId = playId[0].id

          // Get current wins for the specified game
          let totalWins = memberPlays.data.getMember.Plays.items.filter(
            (game) => game.gameId.includes(gameId)
          )[0].wins

          // let totalLoses = memberPlays.data.getMember.Plays.items.filter(
          //   (game) => game.gameId.includes(gameId)
          // )[0].loses

          updateWinner(playId, totalWins, name)
        } else {
          // winner has not won this game before; create a new Win
          // await API.graphql({
          //   query: createWin,
          //   variables: {
          //     input: {
          //       winMemberId: winnerId[0], // Member ID
          //       gameId,
          //       name: gamePlayedName,
          //       owner: user.username,
          //       wins: 1, // Set initial wins to 1 (because they won!!!)
          //       type: 'Win',
          //     },
          //   },
          //   authMode: 'AMAZON_COGNITO_USER_POOLS',
          // })
        }
      })
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
        // let { players, winners } = values

        // players = players.map((player) => {
        //   const playerObjects = {
        //     id: player.split(',')[0],
        //     name: player.split(',')[1],
        //   }
        //   return playerObjects
        // })
        // winners = winners.map((winner) => {
        //   const winnerObjects = {
        //     id: winner.split(',')[0],
        //     name: winner.split(',')[1],
        //   }
        //   return winnerObjects
        // })

        // console.log(players, winners)

        // setSubmitting(false)
        createMemberPlay(values)
        // addGameToDB(values)
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
