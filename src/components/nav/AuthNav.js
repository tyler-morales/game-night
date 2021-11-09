import Image from 'next/image'
import logo from '../../../public/images/logo.svg'
import { useHistory } from 'react-router-dom'

export const AuthNav = () => {
  let history = useHistory()

  const redirectHome = () => {
    history.push('/')
  }
  return (
    <header className="m-auto md:my-10">
      <Image
        style={{ width: '150px' }}
        className="m-auto cursor-pointer"
        src={logo}
        alt="Game Night Logo"
        onClick={redirectHome}
      />
    </header>
  )
}
