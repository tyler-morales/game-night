import { useEffect } from 'react'
// import { stateLogger } from '../../stateLogger'
// import { motion } from 'framer-motion'
import './styles.css'

const Backdrop = ({ children, onClick }) => {
  // Log state
  useEffect(() => {
    // stateLogger('Backdrop', true)
    // return () => stateLogger('Backdrop', false)
  }, [])

  return (
    // <motion.div
    <div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </div>
    // {</motion.div>}
  )
}

export default Backdrop
