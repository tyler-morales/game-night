import { useState, useEffect } from 'react'
import logo from '../logo.svg'
import { Auth, Hub } from 'aws-amplify'
import { NavLink } from 'react-router-dom'
import { AuthForm } from '../components/authFlow/AuthForm'

import { HiMenuAlt4 } from 'react-icons/hi'
import {
  RiBarChart2Fill,
  RiSettings5Fill,
  RiLogoutBoxRLine,
} from 'react-icons/ri'

export const Dashboard = ({ children }) => {
  useEffect(() => {
    checkUser()
    Hub.listen('auth', (data) => {
      const { payload } = data
      if (payload.event === 'signOut') {
        setUser(null)
      }
    })
  }, [])

  const [user, setUser] = useState(null)
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes }
      setUser(userInfo)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  // change nav based on responsive seize
  const [toggleMenu, setToggleMenu] = useState(false)
  const [size, setSize] = useState(window.innerWidth)

  const handleToggle = () =>
    toggleMenu ? setToggleMenu(false) : setToggleMenu(true)

  const updateSize = () => setSize(window.innerWidth)
  useEffect(() => (window.onresize = updateSize))

  // sign out user
  function signOut() {
    Auth.signOut().catch((err) => console.log('error signing out: ', err))
  }

  if (user) {
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
          <NavLink
            to="/"
            className="text-lg py-3 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-10"
          >
            <span>Record a Game</span>
          </NavLink>

          {/* Dashboard & settings buttons */}
          <div
            className={`flex-col md:gap-3 md:mt-10 md:h-full md:justify-between ${
              toggleMenu || size > 768 ? 'flex' : 'hidden'
            }`}
          >
            <div className="w-full">
              <NavLink
                to="/dashboard"
                activeClassName="bg-darkGreen"
                className="md:rounded-md ease-in-out md:border-none border-b-2 border-darkGreen py-4 px-3 md:px-8 items-center text-lg justify-self-start flex gap-2 w-full hover:bg-darkGreen focus:bg-darkGreen mb-0 md:mb-3 "
              >
                <RiBarChart2Fill />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/profile"
                activeClassName="bg-darkGreen"
                className="tranition-all duration-150 md:rounded-md ease-in-out md:border-none border-b-2 border-darkGreen py-4 px-3 md:px-8 items-center text-lg justify-self-start  flex gap-2 w-full hover:bg-darkGreen focus:bg-darkGreen"
              >
                <RiSettings5Fill />
                <span>Settings</span>
              </NavLink>
            </div>

            {/* Logout button */}
            <button
              onClick={signOut}
              className=" tranition-all duration-150 md:rounded-md ease-in-out md:border-none border-b-2 border-darkGreen py-4 px-3 md:px-8 items-center text-lg justify-self-start  flex gap-2 w-full hover:bg-darkGreen focus:bg-darkGreen"
            >
              <RiLogoutBoxRLine />
              <span className=" place-self-end">Logout</span>
            </button>
          </div>
        </nav>
        <section className="p-7 bg-darkGreen w-full h-full rounded-xl">
          {children}
        </section>
      </main>
    )
  }
  return <AuthForm setUser={setUser} />
}
