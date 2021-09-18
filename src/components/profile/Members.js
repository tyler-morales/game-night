import { useState, useEffect } from 'react'

import { CreateMember } from './CreateMember'

// import API from Amplify library
import { API, Auth } from 'aws-amplify'

// import query definition
import { listMembers } from '../../graphql/queries'
import { updateMember, deleteMember } from '../../graphql/mutations'

import { FiTool } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { CgCheckO } from 'react-icons/cg'
import { GiCancel } from 'react-icons/gi'

export const Members = () => {
  const [editingMemberName, setEditingMemberName] = useState(false)
  const [memberName, setMemberName] = useState('')
  const [members, updateMembers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [myMembers, updateMyMembers] = useState([])

  /* fetch member's when component loads */
  useEffect(() => {
    fetchMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchMembers() {
    /* query the API, ask for 100 items */
    let memberData = await API.graphql({
      query: listMembers,
      variables: { limit: 100 },
    })

    let membersArray = memberData.data.listMembers.items
    /* map over the image keys in the members array, get signed image URLs for each image */
    membersArray = await Promise.all(membersArray.map(async (member) => member))

    /* update the members array in the local state */
    setMemberState(membersArray)
  }

  async function setMemberState(membersArray) {
    const user = await Auth.currentAuthenticatedUser()
    const myMemberData = membersArray.filter((p) => p.owner === user.username)
    console.log('membersArray:', membersArray)
    updateMyMembers(myMemberData)
    updateMembers(membersArray)
  }

  // Delete member
  const destroyMember = async (id) => {
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
  const editMemberName = async (e) => {
    setEditingMemberName(true)
  }

  const updateMemberName = async (id) => {
    setEditingMemberName(false)
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

  const memberItems = members.map((member) => {
    return (
      <div
        key={member.id}
        className="flex justify-between bg-primary p-4 items-center text-left rounded-lg border-2 border-white shadow-lg"
      >
        <div className="flex items-center gap-4 w-full">
          {editingMemberName ? (
            <input
              className="text-primary text-base py-2 px-4 rounded-md w-11/12"
              type="text"
              placeholder="Johnny Appleseed"
              onChange={handleChangeName}
            />
          ) : (
            <>
              <div className="text-primary flex items-center justify-center rounded-full text-base bg-tertiary h-12 w-12">
                {member.name.substring(0, 1).toUpperCase()}
              </div>
              <h3 className="text-white text-lg">{member.name}</h3>
            </>
          )}
        </div>
        <div className="flex gap-3">
          <button className="transition-all ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-quad focus:stroke-current focus:text-primary">
            {editingMemberName ? (
              <CgCheckO
                onClick={() => updateMemberName(member.id)}
                className="cursor-pointer"
                size=".75em"
              />
            ) : (
              <FiTool
                onClick={() => editMemberName(member.id)}
                className="cursor-pointer"
                size=".75em"
              />
            )}
          </button>
          <button className="transition-all ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-error">
            {editingMemberName ? (
              <GiCancel onClick={() => destroyMember(member.id)} size=".75em" />
            ) : (
              <RiDeleteBinLine
                onClick={() => destroyMember(member.id)}
                size=".75em"
              />
            )}
          </button>
        </div>
      </div>
    )
  })

  return (
    <div>
      <h2 className="text-white text-2xl text-left mb-5">Members</h2>
      <div className="flex flex-col gap-6">
        {memberItems.length > 0 ? (
          memberItems
        ) : (
          <div className="flex flex-col gap-4 bg-primary rounded-lg p-8 ">
            <h4 className="text-2xl border-b-2 border-quad pb-4">
              You haven't added any members
            </h4>
            <p className="text-sm">
              💡 Click the Add member text below to start adding members to your
              family or friend group
            </p>
          </div>
        )}
      </div>
      <CreateMember updateMembers={setMemberState} members={members} />
    </div>
  )
}
