import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listGames } from '../graphql/queries'

// Centralizes modal control
const useLoadGames = () => {
  const [games, updateGames] = useState([])

  useEffect(() => {
    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchGames = async () => {
    try {
      let gameData = await API.graphql({
        query: listGames,
        variables: { limit: 100 },
      })

      // updateLoading(false)

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

  return { games }
}

export default useLoadGames
