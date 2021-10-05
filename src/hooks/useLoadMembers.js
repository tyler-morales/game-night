import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { listMembers } from '../graphql/queries'

// Centralizes modal control
const useLoadMembers = () => {
  const [membersLoading, setMembersLoading] = useState(true)
  const [memberData, updateMembers] = useState([])

  useEffect(() => {
    fetchMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMembers = async () => {
    try {
      const { username } = await Auth.currentAuthenticatedUser()

      let memberData = await API.graphql({
        query: listMembers,
        variables: { limit: 100, filter: { owner: { eq: username } } },
      })

      setMembersLoading(false)

      let allMembers = memberData.data.listMembers.items
      updateMembers(allMembers)
    } catch (err) {
      console.error(err)
    }
  }

  return { memberData, membersLoading }
}

export default useLoadMembers
