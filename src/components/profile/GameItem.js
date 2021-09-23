import { motion, AnimatePresence } from 'framer-motion'

import { FiTool } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { CgCheckO } from 'react-icons/cg'
import { GiCancel } from 'react-icons/gi'

export const GameItem = ({
  game,
  index,
  editingGameName,
  editGameName,
  handleChangeName,
  updateGameName,
  cancelEditGameName,
  destroyGame,
  deletingGame,
  updatingGameName,
}) => {
  console.log(index, (index + 1) * 100)
  const UpdateNameBtn = () => {
    return (
      <button
        onClick={() => updateGameName(index, game.id)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-quad focus:stroke-current focus:text-primary"
      >
        <CgCheckO size=".75em" />
      </button>
    )
  }

  const EditNameBtn = () => {
    return (
      <button
        onClick={() => editGameName(game.id, index)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-quad focus:stroke-current focus:text-primary"
      >
        <FiTool size=".75em" />
      </button>
    )
  }

  const CancelEditBtn = () => {
    return (
      <button
        onClick={() => cancelEditGameName(game.id, index)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-error"
      >
        <GiCancel size=".75em" />
      </button>
    )
  }

  const DeleteGameBtn = () => {
    return (
      <button
        onClick={() => destroyGame(game.id, index)}
        className="transition-all ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 rounded-sm p-1 focus:bg-error"
      >
        <RiDeleteBinLine size=".75em" />
      </button>
    )
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <motion.div
      variants={item}
      className="flex justify-between bg-primary p-4 items-center text-left rounded-lg border-2 border-white shadow-lg"
    >
      {deletingGame[index] ? (
        <p className="text-sm">Deleting {game.name}...</p>
      ) : updatingGameName[index] ? (
        <p className="text-sm">Updating...</p>
      ) : (
        <div className="flex items-center gap-4 w-full">
          {editingGameName[index] ? (
            <input
              className="transition-all ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 text-primary text-base py-2 px-4 rounded-md w-11/12"
              type="text"
              placeholder="Monoply"
              onChange={handleChangeName}
            />
          ) : (
            <>
              <div className="text-primary flex items-center justify-center rounded-full text-base bg-tertiary h-12 w-12">
                {game.name.substring(0, 1).toUpperCase()}
              </div>
              <h3 className="text-white text-lg">{game.name}</h3>
            </>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {editingGameName[index] ? <UpdateNameBtn /> : <EditNameBtn />}
        {editingGameName[index] ? <CancelEditBtn /> : <DeleteGameBtn />}
      </div>
    </motion.div>
  )
}
