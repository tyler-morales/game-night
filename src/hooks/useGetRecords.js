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
      let recordData = await API.graphql({
        query: listRecordGames,
        variables: { limit: 100 },
      })

      let allRecords = recordData.data.listRecordGames.items

      setLoading(false)
      filterByOwner(allRecords)
    } catch (err) {
      console.error(err)
    }
  }

  // filter data by owner
  const filterByOwner = async (allMembers) => {
    const { username } = await Auth.currentAuthenticatedUser()
    const filteredData = allMembers.filter((p) => p.owner === username)

    setData(filteredData)
  }

  return { data, loading }
}

export default useLoadRecords
