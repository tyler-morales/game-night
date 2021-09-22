import { useState, useEffect } from 'react'

import { CreateMember } from './CreateMember'

// import API from Amplify library
import { API, Auth } from 'aws-amplify'

// import query definition
import { listMembers } from '../../graphql/queries'
import { updateMember, deleteMember } from '../../graphql/mutations'

import { MemberItem } from './MemberItem'

import '../../Spinner.css'

export const Members = () => {
  const [memberName, setMemberName] = useState('')
  const [loading, updateLoading] = useState(true)
  const [members, updateMembers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [myMembers, updateMyMembers] = useState([])

  /* fetch members when component loads */
  useEffect(() => {
    fetchMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchMembers() {
    try {
      /* query the API, ask for 100 items */
      let memberData = await API.graphql({
        query: listMembers,
        variables: { limit: 100 },
      })

      updateLoading(false)

      let allMembers = memberData.data.listMembers.items

      /* update the members array in the local state */
      setMemberState(allMembers)
    } catch (err) {
      console.log(err)
    }
  }

  async function setMemberState(allMembers) {
    const { username } = await Auth.currentAuthenticatedUser()
    const myMemberData = allMembers.filter((p) => p.owner === username)

    console.log(username)
    console.log('Members Array', allMembers)
    console.log('Member Data', myMemberData)

    updateMyMembers(myMemberData)
    updateMembers(myMemberData)
  }

  const [editingMemberName, setEditingMemberName] = useState(
    members.map(() => false)
  )

  const [deletingMember, setDeletingMember] = useState(members.map(() => false))

  // Delete member
  const destroyMember = async (id, index) => {
    let new_deleting_member_state = members.map(() => false)
    new_deleting_member_state[index] = true
    setDeletingMember(new_deleting_member_state)

    try {
      await API.graphql({
        query: deleteMember,
        variables: { input: { id } },
      })

      fetchMembers()
      console.log('Member Deleted Succesfully')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeName = (e) => {
    setMemberName(e.target.value)
  }

  // Update member name
  const editMemberName = async (_, index) => {
    let new_editing_members_state = members.map(() => false)
    new_editing_members_state[index] = true
    setEditingMemberName(new_editing_members_state)
  }

  // Cancel editing mode
  const cancelEditMemberName = async (_, index) => {
    let new_editing_members_state = members.map(() => false)
    new_editing_members_state[index] = false
    setEditingMemberName(new_editing_members_state)
  }

  // UPDATE name in database
  const updateMemberName = async (index, id) => {
    let new_editing_members_state = members.map(() => false)
    new_editing_members_state[index] = false
    setEditingMemberName(new_editing_members_state)

    try {
      await API.graphql({
        query: updateMember,
        variables: {
          input: {
            id,
            name: memberName,
          },
        },
      })

      fetchMembers()
      console.log('Member name udpated Succesfully')
    } catch (err) {
      console.log(err)
    }
  }

  const memberItems = members.map((member, index) => {
    return (
      <MemberItem
        key={index}
        member={member}
        index={index}
        editingMemberName={editingMemberName}
        editMemberName={editMemberName}
        handleChangeName={handleChangeName}
        updateMemberName={updateMemberName}
        cancelEditMemberName={cancelEditMemberName}
        destroyMember={destroyMember}
        deletingMember={deletingMember}
      />
    )
  })
  return (
    <div>
      <h2 className="text-white text-2xl text-left mb-5">Members</h2>
      {!loading ? (
        <>
          <div className="flex flex-col gap-6">
            {memberItems.length > 0 ? (
              // TODO: Sort by "createdAt property"
              memberItems
            ) : (
              <div className="flex flex-col gap-4 bg-primary rounded-lg p-8 ">
                <h4 className="text-2xl border-b-2 border-quad pb-4">
                  You haven't added any members
                </h4>
                <p className="text-sm">
                  💡 Click the Add member text below to start adding members to
                  your family or friend group
                </p>
              </div>
            )}
          </div>
          <CreateMember updateMembers={setMemberState} members={members} />
        </>
      ) : (
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  )
}
