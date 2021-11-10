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
      <div className="m-auto cursor-pointer text-center">
        <Image
          src={logo}
          alt="Game Night Logo"
          onClick={redirectHome}
          width={200}
          height={200}
        />
      </div>
    </header>
  )
}
