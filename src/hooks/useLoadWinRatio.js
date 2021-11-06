import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listPlays } from '../graphql/queries'

// Centralizes modal control
const useLoadWinRatio = (gameId) => {
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
        const winRatioObject = {
          name: item.member.name,
          winRatio: item.winRatio,
        }
        return winRatioObject
      })
      setData(filteredPlaysByGame)
    } catch (err) {
      console.error(err)
    }
  }

  return { data, loading }
}

export default useLoadWinRatio
