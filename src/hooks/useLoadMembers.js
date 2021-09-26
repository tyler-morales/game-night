import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listMembers } from '../graphql/queries'

// Centralizes modal control
const useLoadMembers = (updateLoading) => {
  const [members, updateMembers] = useState([])

  useEffect(() => {
    fetchMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMembers = async () => {
    try {
      let memberData = await API.graphql({
        query: listMembers,
        variables: { limit: 100 },
      })

      updateLoading(false)

      let allMembers = memberData.data.listMembers.items
      setFilteredMembers(allMembers)
    } catch (err) {
      console.error(err)
    }
  }

  const setFilteredMembers = async (allMembers) => {
    const { username } = await Auth.currentAuthenticatedUser()
    const myMemberData = allMembers.filter((p) => p.owner === username)

    updateMembers(myMemberData)
  }

  return { members }
}

export default useLoadMembers
