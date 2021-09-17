import { useState, useEffect } from 'react'

// import API from Amplify library
import { API, Auth } from 'aws-amplify'

// import query definition
import { listMembers } from '../../graphql/queries'

import { FiTool } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { CreateMember } from './CreateMember'

export const Members = () => {
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
    membersArray = await Promise.all(
      membersArray.map(async (member) => {
        return member
      })
    )
    /* update the members array in the local state */
    setMemberState(membersArray)
  }
  async function setMemberState(membersArray) {
    const user = await Auth.currentAuthenticatedUser()
    const myPostData = membersArray.filter((p) => p.owner === user.username)
    console.log('membersArray:', membersArray)
    updateMyMembers(myPostData)
    updateMembers(membersArray)
  }

  const memberItems = members.map((member) => {
    return (
      <div
        key={member.id}
        className="flex justify-between bg-primary p-4 items-center text-left rounded-lg border-2 border-white shadow-lg"
      >
        <div className="flex items-center gap-4">
          {/* TODO: Create user avatars */}
          <div className="text-primary flex items-center justify-center rounded-full text-base bg-tertiary h-12 w-12">
            {member.name.substring(0, 1).toUpperCase()}
          </div>
          <h3 className="text-white text-lg">{member.name}</h3>
        </div>
        <div className="flex gap-3">
          <FiTool className="cursor-pointer" size=".75em" />
          <RiDeleteBinLine
            // onClick={deleteMember}
            className="cursor-pointer"
            size=".75em"
          />
        </div>
      </div>
    )
  })

  return (
    <div>
      <h2 className="text-white text-2xl text-left mb-5">Members</h2>
      <div className="flex flex-col gap-6">{memberItems}</div>
      <CreateMember updateMembers={setMemberState} members={members} />
    </div>
  )
}
