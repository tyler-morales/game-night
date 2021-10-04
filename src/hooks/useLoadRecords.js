import { useState, useEffect } from 'react'

import { API } from 'aws-amplify'

import { listRecordGames } from '../graphql/queries'

const useLoadRecords = () => {
  const [loading, setLoading] = useState(true)
  const [records, updateRecords] = useState()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      let recordData = await API.graphql({
        query: listRecordGames,
        variables: { limit: 100 },
      })

      setLoading(false)

      const allRecords = recordData.data.listRecordGames.items.map(
        (item) => item.name
      )
      const arrayOfOccurrenceObjects = Object.values(
        allRecords.reduce((acc, el) => {
          if (!acc[el]) acc[el] = { name: el, value: 0 }
          acc[el].value++
          return acc
        }, {})
      )
      updateRecords(() => [...arrayOfOccurrenceObjects])
    } catch (err) {
      console.error(err)
    }
  }

  return { records, loading }
}

export default useLoadRecords
