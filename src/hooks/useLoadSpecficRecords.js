import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listRecordGames } from '../graphql/queries'

// Centralizes modal control
const useLoadSpecficRecords = (date) => {
  const [loading, setLoading] = useState(true)
  const [games, setData] = useState([])

  useEffect(() => {
    fetchGames(date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const fetchGames = async (date) => {
    try {
      // fetch games from database
      const { username } = await Auth.currentAuthenticatedUser()
      let records = await API.graphql({
        query: listRecordGames,
        variables: {
          filter: {
            owner: { eq: username },
          },
        },
      })

      const allGames = records.data.listRecordGames.items

      const formatedDates = allGames.map(
        ({ createdAt, name, players, winners }) => {
          return {
            createdAt: new Date(createdAt).toLocaleString().split(',')[0],
            gameName: name,
            players,
            winners,
          }
        }
      )

      const filteredGames = formatedDates.filter(({ createdAt }) => {
        return createdAt === new Date(date).toLocaleDateString('en-US')
      })

      setLoading(false)
      setData(filteredGames)
    } catch (err) {
      console.error(err)
    }
  }

  return { games, loading }
}

export default useLoadSpecficRecords
