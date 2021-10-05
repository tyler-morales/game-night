import { useState, useEffect } from 'react'

import { CreateMember } from './CreateMember'

// import API from Amplify library
import { API, Auth } from 'aws-amplify'

// import all members by 'createdAt'
import { membersByDate } from '../../graphql/queries'
import { updateMember, deleteMember } from '../../graphql/mutations'

import { MemberItem } from './MemberItem'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

export const Members = () => {
  const [memberName, setMemberName] = useState('')
  const [loading, updateLoading] = useState(true)
  const [members, updateMembers] = useState([])

  /* fetch members when component loads */
  useEffect(() => {
    fetchMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMembers = async (index) => {
    try {
      let memberData = await API.graphql({
        query: membersByDate,
        variables: { limit: 100, type: 'Member', sortDirection: 'ASC' },
      })

      updateLoading(false)
      handleIndividualOperation(index, false, 'DELETE_MEMBER')
      handleIndividualOperation(index, false, 'UPDATE_NAME')

      let allMembers = memberData.data.membersByDate.items

      /* update the members array in the local state */
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

  // Editing member name state
  const [editingMemberName, setEditingMemberName] = useState(
    members.map(() => false)
  )

  // Deleting member state
  const [deletingMember, setDeletingMember] = useState(members.map(() => false))

  // Updating member name state
  const [updatingMemberName, setUpdatingMemberName] = useState(
    members.map(() => false)
  )

  const handleIndividualOperation = async (index, state, operation) => {
    let newState = members.map(() => false)
    newState[index] = state

    switch (operation) {
      case 'EDIT_NAME':
        setEditingMemberName(newState)
        break
      case 'DELETE_MEMBER':
        setDeletingMember(newState)
        break
      case 'UPDATE_NAME':
        setUpdatingMemberName(newState)
        break
      default:
        return
    }
  }

  // Delete member
  const destroyMember = async (id, index) => {
    try {
      handleIndividualOperation(index, true, 'DELETE_MEMBER')
      await API.graphql({
        query: deleteMember,
        variables: { input: { id } },
      })

      fetchMembers(index)
    } catch (err) {
      console.error(err)
    }
  }

  // Helper fn: Get user's input data
  const handleChangeName = (e) => {
    if (e.target.value.length > 0) setMemberName(e.target.value.trim())
  }

  // UPDATE member name
  const editMemberName = async (_, index) => {
    handleIndividualOperation(index, true, 'EDIT_NAME')
  }

  // CANCEL editing mode
  const cancelEditMemberName = async (_, index) => {
    handleIndividualOperation(index, false, 'EDIT_NAME')
  }

  // UPDATE name in database
  const updateMemberName = async (index, id) => {
    console.log({
      new: memberName,
      old: members[index].name,
      length: memberName.length,
    })

    if (memberName !== members[index].name && memberName !== '') {
      handleIndividualOperation(index, false, 'EDIT_NAME')
      handleIndividualOperation(index, true, 'UPDATE_NAME')

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
      } catch (err) {
        console.error(err)
      }
    } else {
      // TODO: Create an alert (modal, dialogue etc...)
      alert(`Input field can't be empty: Either enter a new name or cancel`)
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
        updatingMemberName={updatingMemberName}
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
          <CreateMember updateMembers={setFilteredMembers} members={members} />
        </>
      ) : (
        <LoadingRipple />
      )}
    </div>
  )
}
