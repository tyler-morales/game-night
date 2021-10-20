import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listRecordGames } from '../graphql/queries'

// Centralizes modal control
const useLoadSpecficRecords = ({ date }) => {
  const [loading, setLoading] = useState(true)
  const [games, setData] = useState([])

  useEffect(() => {
    fetchGames(date)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const fetchGames = async (date) => {
    // let newDate = (await date) | null
    date = date ? date.replaceAll('/', '-') : null

    try {
      const { username } = await Auth.currentAuthenticatedUser()

      let records = await API.graphql({
        query: listRecordGames,
        variables: {
          filter: {
            owner: { eq: username },
            createdAt: { contains: date },
          },
        },
      })

      const allGames = records.data.listRecordGames.items
      const filteredGames = allGames.map((record) => {
        return {
          gameName: record.name,
          players: record.players,
          winners: record.winners,
        }
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
