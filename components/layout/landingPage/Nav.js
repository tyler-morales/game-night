/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import Image from 'next/image'

import logo from '../../../public/images/logo.svg'

export const Nav = () => {
  return (
    <nav className="flex justify-between w-full my-8">
      <div className="w-24 md:w-36">
        <Image src={logo} alt="Game Night Logo" />
      </div>
      <div className="flex gap-6 ">
        <Link href="/signin">
          <a className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary">
            Sign in
          </a>
        </Link>
        <Link href="/signup">
          <a className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary">
            Sign up
          </a>
        </Link>
      </div>
    </nav>
  )
}
