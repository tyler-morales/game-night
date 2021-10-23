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
      //format incomming dates without preceding zeros with zeros and dashes instead of slashes
      const formatDate = (date) => {
        return date
          .split('/')
          .map((digit) => {
            const num = parseInt(digit)
            return num < 10 ? `0${digit}` : digit
          })
          .join('/')
          .replaceAll('/', '-')
      }

      const formatedDate = await formatDate(date)

      // fetch games from database
      const { username } = await Auth.currentAuthenticatedUser()

      let records = await API.graphql({
        query: listRecordGames,
        variables: {
          filter: {
            owner: { eq: username },
            createdAt: { contains: formatedDate },
          },
        },
      })

      const allGames = records.data.listRecordGames.items
      const filteredGames = allGames.map(({ name, players, winners }) => {
        return {
          gameName: name,
          players: players,
          winners: winners,
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
