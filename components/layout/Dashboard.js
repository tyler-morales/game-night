/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/images/logo.svg'
import { Hub } from 'aws-amplify'
import Link from 'next/link'
import SignIn from '../../pages/signin'

import { useUser } from '../../contexts/UserContext'

import { HiMenuAlt4 } from 'react-icons/hi'
import { FiLoader } from 'react-icons/fi'
import {
  RiBarChart2Fill,
  RiSettings5Fill,
  RiLogoutBoxRLine,
  RiCloseFill,
} from 'react-icons/ri'

export const Dashboard = ({ children }) => {
  const { user, logout } = useUser()
  const [spinner, setSpinner] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  // Set spinner to false when user logs out
  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      if (payload.event === 'signOut') {
        setSpinner(false)
      }
    })
  }, [])

  // change nav based on responsive seize
  const [toggleMenu, setToggleMenu] = useState(false)
  // const [size, setSize] = useState(window.innerWidth)

  const handleToggle = () => {
    toggleMenu ? setToggleMenu(false) : setToggleMenu(true)
    hamburger ? setHamburger(false) : setHamburger(true)
  }

  // const updateSize = () => setSize(window.innerWidth)

  // useEffect(() => (window.onresize = updateSize))

  const handleLogOut = () => {
    try {
      setSpinner(true)
      logout()
    } catch (error) {
      console.error(error)
    }
  }

  if (user) {
    return (
      <main
        id="dashboard"
        className="flex flex-col md:grid gap-5 grid-cols-1 md:grid-cols-dashboard text-white text-3xl text-center px-5 m-auto pt-8"
      >
        <nav className="flex flex-col md:items-center gap-3">
          <div className="relative flex justify-between items-center">
            {/* Logo */}
            <div className="md:m-auto" style={{ width: '100px' }}>
              <Image src={logo} alt="Game Night Logo" />
            </div>
            {/* Hamburger menu */}
            <div onClick={handleToggle} className="cursor-pointer md:hidden">
              {hamburger ? <RiCloseFill /> : <HiMenuAlt4 />}
            </div>
          </div>

          {/* Record a Game  */}
          <Link href="/record-game">
            <a className="transition-all text-lg py-3 md:py-2 px-5 bg-secondary text-primary rounded-md mt-2 md:mt-10 focus-secondary">
              Record a Game
            </a>
          </Link>

          {/* Dashboard & settings buttons */}
          <div
            className="flex-col md:gap-3 md:mt-10 md:h-full md:justify-between flex"
            // className={`flex-col md:gap-3 md:mt-10 md:h-full md:justify-between ${
            //   toggleMenu || size >= 768 ? 'flex' : 'hidden'
            // }`}
          >
            <div className="w-full">
              <Link href="/dashboard">
                <a
                  className="cursor-pointer transition-all md:rounded-md ease-in-out  mb-0 md:mb-6 py-4 px-3 md:px-8 items-center text-lg justify-self-start flex gap-2 w-full hover:bg-darkGreen focus-darkgreen"
                  activeClassName="bg-darkGreen"
                >
                  <RiBarChart2Fill />
                  <span>Dashboard</span>
                </a>
              </Link>
              <Link href="/profile">
                <a
                  className="cursor-pointer tranition-all duration-150 md:rounded-md ease-in-out  py-4 px-3 md:px-8 items-center text-lg justify-self-start flex gap-2 w-full hover:bg-darkGreen focus-darkgreen"
                  activeClassName="bg-darkGreen"
                >
                  <RiSettings5Fill />
                  <span>Settings</span>
                </a>
              </Link>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogOut}
              className="cursor-pointer tranition-all duration-150 md:rounded-md ease-in-out md:border-none border-b-2 border-darkGreen py-4 px-3 md:px-8 items-center text-lg justify-self-start  flex gap-2 w-full hover:bg-darkGreen focus-darkgreen"
            >
              {spinner ? (
                <span className="flex items-center gap-2 w-full">
                  <FiLoader className="animate-spin" />
                  <span className="place-self-end">Logging out</span>
                </span>
              ) : (
                <span className="flex items-center gap-2 w-full">
                  <RiLogoutBoxRLine />
                  <span className="place-self-end">Log out</span>
                </span>
              )}
            </button>
          </div>
        </nav>
        <section className="p-4 md:p-7 bg-darkGreen w-full h-full rounded-xl max-h-95 overflow-scroll overscroll-auto focus-darkgreen">
          {children}
        </section>
      </main>
    )
  }
  return <SignIn />
}
