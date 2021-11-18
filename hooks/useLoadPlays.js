import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listPlays } from '../graphql/queries'

// Centralizes modal control
const useLoadPlays = (gameId) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchPlays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  const fetchPlays = async () => {
    try {
      setLoading(false)

      const { username } = await Auth.currentAuthenticatedUser()

      let filteredPlays = await API.graphql({
        query: listPlays,
        variables: {
          filter: {
            gameId: { contains: gameId.value },
            owner: { eq: username },
          },
        },
      })

      let filteredPlaysByGame = filteredPlays.data.listPlays.items

      filteredPlaysByGame = filteredPlaysByGame.map((item) => {
        const winnerObject = {
          name: item.member.name,
          Wins: item.wins,
          Loses: item.loses,
        }
        return winnerObject
      })
      setData(filteredPlaysByGame)
    } catch (err) {
      console.error(err)
    }
  }

  return { data, loading }
}

export default useLoadPlays
