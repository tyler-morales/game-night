import { useState, useEffect } from 'react'

import { API, Auth } from 'aws-amplify'

import { listRecordGames } from '../graphql/queries'

const useLoadRecords = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      const { username } = await Auth.currentAuthenticatedUser()

      let recordData = await API.graphql({
        query: listRecordGames,
        variables: { filter: { owner: { eq: username } } },
      })

      let allRecords = recordData.data.listRecordGames.items

      setLoading(false)
      setData(allRecords)
    } catch (err) {
      console.error(err)
    }
  }

  return { data, loading }
}

export default useLoadRecords
