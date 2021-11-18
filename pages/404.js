/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/images/logo.svg'

export default function Custom404() {
  return (
    <div className="flex justify-center items-center h-screen gap-5">
      <div>
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="Logo" />
        </div>
        <h1 className="text-white text-2xl font-bold">
          Looks like you lost your way!
        </h1>
        <div className="flex gap-4">
          <Link href="/">
            <a className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary">
              Go Home
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary">
              Go to Dashboard
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
