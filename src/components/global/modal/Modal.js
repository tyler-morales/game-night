// import { useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { stateLogger } from '../../stateLogger'
import { BsFillPersonPlusFill } from 'react-icons/bs'

import Backdrop from '../modal/Backdrop'

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const Modal = ({ handleClose, addMember, onChangeText, formState }) => {
  // Log state
  // useEffect(() => {
  //   stateLogger('Modal', true)
  //   return () => stateLogger('Modal', false)
  // }, [])

  return (
    <Backdrop onClick={handleClose}>
      {/* <motion.div */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="border-2 border-quad w-96 flex flex-col gap-3 bg-primary rounded-lg p-8 text-left"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-max flex flex-col gap-3 bg-primary rounded-lg p-8 text-left">
          <ModalTitle />
          <form onSubmit={addMember} className="mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="member-name">
                Member's Name
              </label>
              <input
                name="name"
                onChange={onChangeText}
                value={formState.name}
                className="ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 text-base text-primary py-2 px-4 rounded-md max-w-xs"
                type="text"
                placeholder="Lizzie Magie"
              />
            </div>
            <div className="flex gap-5 mt-8">
              <ModalButton onClick={handleClose} label="Close" />
              <button className="transition-all ring-offset-primary ring-offset-2 focus:ring-tertiary focus:outline-none focus:ring-2 text-lg rounded-md py-2 px-4 text-primary bg-tertiary">
                Add Member
              </button>
            </div>
          </form>
          {formState.saving && (
            <p className="text-sm">Saving {formState.name}...</p>
          )}
        </div>
      </div>
      {/* </motion.div> */}
    </Backdrop>
  )
}

const ModalTitle = () => (
  <div className="flex items-center gap-4">
    <BsFillPersonPlusFill size=".75em" />
    <h3 className="text-2xl">Add Member</h3>
  </div>
)

const ModalButton = ({ onClick, label }) => (
  // <motion.button
  <button
    className="transition-all ring-offset-primary ring-offset-2 focus:ring-error focus:outline-none focus:ring-2 text-lg rounded-md py-2 px-4 bg-error"
    type="button"
    onClick={onClick}
  >
    {label}
  </button>
  // </motion.button>
)

export default Modal
