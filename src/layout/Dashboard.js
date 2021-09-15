import { useState, useEffect } from 'react'
import logo from '../logo.svg'
import { HiMenuAlt4 } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {
  RiBarChart2Fill,
  RiSettings5Fill,
  RiLogoutBoxRLine,
} from 'react-icons/ri'

export const Dashboard = ({ children }) => {
  // change nav based on responsive seize
  const [toggleMenu, setToggleMenu] = useState(false)
  const [size, setSize] = useState(window.innerWidth)

  const handleToggle = () =>
    toggleMenu ? setToggleMenu(false) : setToggleMenu(true)

  const updateSize = () => setSize(window.innerWidth)
  useEffect(() => (window.onresize = updateSize))

  return (
    <main
      id="dashboard"
      className="flex flex-col md:grid gap-5 grid-cols-1 md:grid-cols-dashboard text-white text-3xl text-center px-5 m-auto"
    >
      <nav className="flex flex-col md:items-center gap-3">
        <div className="relative flex justify-between items-center">
          {/* Logo */}
          <img
            className="md:m-auto"
            style={{ width: '100px' }}
            src={logo}
            alt="Game Night Logo"
          />
          {/* Hamburger menu */}
          <div onClick={handleToggle} className="cursor-pointer md:hidden">
            <HiMenuAlt4 />
          </div>
        </div>

        {/* Record a Game  */}
        <Link
          to="/"
          className="text-lg py-3 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-10"
        >
          <span>Record a Game</span>
        </Link>

        {/* Dashboard & settings buttons */}
        <div
          className={`flex-col md:gap-3 md:mt-10 md:h-full md:justify-between ${
            toggleMenu || size > 768 ? 'flex' : 'hidden'
          }`}
        >
          <div className="w-full">
            <Link
              to="/dashboard"
              className="md:rounded-md ease-in-out md:border-none border-b-2 border-darkGreen py-4 px-3 md:px-8 items-center text-lg justify-self-start flex gap-2 w-full hover:bg-darkGreen focus:bg-darkGreen"
            >
              <RiBarChart2Fill />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/profile"
              className="tranition-all duration-150 md:rounded-md ease-in-out md:border-none border-b-2 border-darkGreen py-4 px-3 md:px-8 items-center text-lg justify-self-start  flex gap-2 w-full hover:bg-darkGreen focus:bg-darkGreen"
            >
              <RiSettings5Fill />
              <span>Profile</span>
            </Link>
          </div>

          {/* Logout button */}
          <button
            // onClick={signOut}
            className=" tranition-all duration-150 md:rounded-md ease-in-out md:border-none border-b-2 border-darkGreen py-4 px-3 md:px-8 items-center text-lg justify-self-start  flex gap-2 w-full hover:bg-darkGreen focus:bg-darkGreen"
          >
            <RiLogoutBoxRLine />
            <span className=" place-self-end">Logout</span>
          </button>
        </div>
      </nav>
      <section className="bg-darkGreen w-full h-full rounded-xl">
        {children}
      </section>
    </main>
  )
}
