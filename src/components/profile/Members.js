import { useState } from 'react'
import { FiTool } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'

export const Members = () => {
  const [members, setMembers] = useState(['Tyler', 'Sonia'])

  // CREATE a new member
  const addMember = () => {
    console.log('add member')
  }

  // DELETE a member
  const deleteMember = () => {
    console.log(console.log('delete member'))
  }

  const memberItems = members.map((member, i) => {
    return (
      <div
        key={i}
        className="flex justify-between bg-primary p-4 items-center text-left rounded-lg border-2 border-white shadow-lg"
      >
        <div className="flex items-center gap-4">
          {/* TODO: Create user avatars */}
          <div className="text-primary flex items-center justify-center rounded-full text-base bg-tertiary h-12 w-12">
            {member.substring(0, 2).toUpperCase()}
          </div>
          <h3 className="text-white text-lg">{member}</h3>
        </div>
        <div className="flex gap-3">
          <FiTool className="cursor-pointer" size=".75em" />
          <RiDeleteBinLine
            onClick={deleteMember}
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
      <div class="flex flex-col gap-6">{memberItems}</div>
      <span
        onClick={addMember}
        className="cursor-pointer text-xs uppercase mt-6 block"
      >
        + Add Group Member
      </span>
    </div>
  )
}
