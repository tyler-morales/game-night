import Image from 'next/image'
import logo from '../../../public/images/logo.svg'
import { useRouter } from 'next/router'

export const AuthNav = () => {
  const router = useRouter()

  return (
    <header className="m-auto md:my-10">
      <div className="m-auto cursor-pointer text-center">
        <Image
          src={logo}
          alt="Game Night Logo"
          onClick={() => router.push('/')}
          width={200}
          height={200}
        />
      </div>
    </header>
  )
}
