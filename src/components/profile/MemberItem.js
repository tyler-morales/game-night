import { FiTool } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { CgCheckO } from 'react-icons/cg'
import { GiCancel } from 'react-icons/gi'

export const MemberItem = ({
  member,
  index,
  editingMemberName,
  editMemberName,
  handleChangeName,
  updateMemberName,
  cancelEditMemberName,
  destroyMember,
  deletingMember,
}) => {
  const UpdateNameBtn = () => {
    return (
      <button
        onClick={() => updateMemberName(index, member.id)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-quad focus:stroke-current focus:text-primary"
      >
        <CgCheckO size=".75em" />
      </button>
    )
  }

  const EditNameBtn = () => {
    return (
      <button
        onClick={() => editMemberName(member.id, index)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-quad focus:stroke-current focus:text-primary"
      >
        <FiTool size=".75em" />
      </button>
    )
  }

  const CancelEditBtn = () => {
    return (
      <button
        onClick={() => cancelEditMemberName(member.id, index)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-error"
      >
        <GiCancel size=".75em" />
      </button>
    )
  }

  const DeleteMemberBtn = () => {
    return (
      <button
        onClick={() => destroyMember(member.id, index)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-error"
      >
        <RiDeleteBinLine size=".75em" />
      </button>
    )
  }

  return (
    <div className="flex justify-between bg-primary p-4 items-center text-left rounded-lg border-2 border-white shadow-lg">
      {deletingMember[index] ? (
        <p className="text-sm">Deleting {member.name}...</p>
      ) : (
        <div className="flex items-center gap-4 w-full">
          {editingMemberName[index] ? (
            <input
              className="transition-all ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 text-primary text-base py-2 px-4 rounded-md w-11/12"
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
      )}

      <div className="flex gap-3">
        {editingMemberName[index] ? <UpdateNameBtn /> : <EditNameBtn />}
        {editingMemberName[index] ? <CancelEditBtn /> : <DeleteMemberBtn />}
      </div>
    </div>
  )
}
