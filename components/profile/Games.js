import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { CreateGame } from './CreateGame'

// import API from Amplify library
import { API, Auth } from 'aws-amplify'

// import all games by 'createdAt'
import { gamesByDate } from '../../graphql/queries'
import { updateGame, deleteGame } from '../../graphql/mutations'

import { GameItem } from './GameItem'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

export const Games = () => {
  const [gameName, setGameName] = useState('')
  const [loading, updateLoading] = useState(true)
  const [games, updateGames] = useState([])

  /* fetch games when component loads */
  useEffect(() => {
    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchGames = async (index) => {
    try {
      let gameData = await API.graphql({
        query: gamesByDate,
        variables: { limit: 100, type: 'Game', sortDirection: 'ASC' },
      })

      updateLoading(false)
      handleIndividualOperation(index, false, 'DELETE_MEMBER')
      handleIndividualOperation(index, false, 'UPDATE_NAME')

      let allGames = gameData.data.gamesByDate.items

      /* update the games array in the local state */
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

  // Editing game name state
  const [editingGameName, setEditingGameName] = useState(games.map(() => false))

  // Deleting game state
  const [deletingGame, setDeletingGame] = useState(games.map(() => false))

  // Updating game name state
  const [updatingGameName, setUpdatingGameName] = useState(
    games.map(() => false)
  )

  const handleIndividualOperation = async (index, state, operation) => {
    let newState = games.map(() => false)
    newState[index] = state

    switch (operation) {
      case 'EDIT_NAME':
        setEditingGameName(newState)
        break
      case 'DELETE_MEMBER':
        setDeletingGame(newState)
        break
      case 'UPDATE_NAME':
        setUpdatingGameName(newState)
        break
      default:
        return
    }
  }

  // Delete game
  const destroyGame = async (id, index) => {
    try {
      handleIndividualOperation(index, true, 'DELETE_MEMBER')
      await API.graphql({
        query: deleteGame,
        variables: { input: { id } },
      })
      toast.success('Game Deleted 🔥')

      fetchGames(index)
    } catch (err) {
      console.error(err)
    }
  }

  // Helper fn: Get user's input data
  const handleChangeName = (e) => {
    if (e.target.value.length > 0) setGameName(e.target.value.trim())
  }

  // UPDATE game name
  const editGameName = async (_, index) => {
    handleIndividualOperation(index, true, 'EDIT_NAME')
  }

  // CANCEL editing mode
  const cancelEditGameName = async (_, index) => {
    handleIndividualOperation(index, false, 'EDIT_NAME')
  }

  // UPDATE name in database
  const updateGameName = async (index, id) => {
    if (gameName !== games[index].name && gameName !== '') {
      handleIndividualOperation(index, false, 'EDIT_NAME')
      handleIndividualOperation(index, true, 'UPDATE_NAME')

      try {
        await API.graphql({
          query: updateGame,
          variables: {
            input: {
              id,
              name: gameName,
            },
          },
        })

        toast.success(`${gameName} updated ⬆️`)

        fetchGames()
      } catch (err) {
        console.error(err)
      }
    } else {
      toast.error(
        `Input field can't be empty: Either enter a new name or cancel`
      )
    }
  }

  const gameItems = games.map((game, index) => (
    <GameItem
      key={index}
      game={game}
      index={index}
      editingGameName={editingGameName}
      editGameName={editGameName}
      handleChangeName={handleChangeName}
      updateGameName={updateGameName}
      cancelEditGameName={cancelEditGameName}
      destroyGame={destroyGame}
      deletingGame={deletingGame}
      updatingGameName={updatingGameName}
    />
  ))

  return (
    <div>
      <h2 className="text-white text-2xl text-left mb-5">Games</h2>
      {!loading ? (
        <>
          <div className="flex flex-col gap-6">
            {gameItems.length > 0 ? (
              gameItems
            ) : (
              <div className="flex flex-col gap-4 bg-primary rounded-lg p-8 ">
                <h4 className="text-2xl border-b-2 border-quad pb-4">
                  You haven't added any games
                </h4>
                <p className="text-sm">
                  💡 Click the Add game text below to start adding games to your
                  family or friend group
                </p>
              </div>
            )}
          </div>
          <CreateGame updateGames={setFilteredGames} games={games} />
        </>
      ) : (
        <LoadingRipple />
      )}
    </div>
  )
}
