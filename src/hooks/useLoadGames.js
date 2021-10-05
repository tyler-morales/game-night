import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listGames } from '../graphql/queries'

// Centralizes modal control
const useLoadGames = (updateLoading) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchGames = async () => {
    try {
      const { username } = await Auth.currentAuthenticatedUser()

      let gameData = await API.graphql({
        query: listGames,
        variables: { limit: 100, filter: { owner: { eq: username } } },
      })

      let allGames = gameData.data.listGames.items
      setLoading(false)
      setData(allGames)
    } catch (err) {
      console.error(err)
    }
  }

  return { data, loading }
}

export default useLoadGames
