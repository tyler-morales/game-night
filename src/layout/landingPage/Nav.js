import Link from 'next/link'
import Image from 'next/image'

import logo from '../../../public/images/logo.svg'

export const Nav = () => {
  return (
    <nav className="flex justify-between w-full mb-8">
      <Image className="w-24 md:w-36" src={logo} alt="Game Night Logo" />
      <div className="flex gap-6 ">
        <Link
          href="/sign-in"
          className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auhref text-center focus-secondary"
        >
          <span>Sign in</span>
        </Link>
        <Link
          href="/sign-up"
          className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary"
        >
          <span>Sign up</span>
        </Link>
      </div>
    </nav>
  )
}
