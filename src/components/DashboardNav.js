import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import {
  RiBarChart2Fill,
  RiSettings5Fill,
  RiLogoutBoxRLine,
} from 'react-icons/ri'

export const DashboardNav = () => {
  return (
    <nav className="flex flex-col items-center gap-3">
      <img style={{ width: '100px' }} src={logo} alt="Game Night Logo" />

      <Link
        to="/"
        className="text-lg py-3 px-4 bg-secondary text-primary rounded-md mt-10"
      >
        <span>Record a Game</span>
      </Link>

      <div className="flex flex-col gap-3 mt-10 h-full justify-between">
        <div>
          <Link
            to="dashboard"
            className="tranition-all duration-150 rounded-md ease-in-out py-4 px-8 items-center text-lg justify-self-start flex gap-2 w-full hover:bg-darkGreen"
          >
            <RiBarChart2Fill />
            <span className="">Dashboard</span>
          </Link>
          <Link
            to="/account"
            className="tranition-all duration-150 rounded-md ease-in-out py-4 px-8 items-center text-lg justify-self-start  flex gap-2 w-full hover:bg-darkGreen"
          >
            <RiSettings5Fill />
            <span className="">Settings</span>
          </Link>
        </div>

        <Link
          to="/"
          className=" tranition-all duration-150 rounded-md ease-in-out py-4 px-8 items-center text-lg justify-self-start  flex gap-2 w-full hover:bg-darkGreen"
        >
          <RiLogoutBoxRLine />
          <span className=" place-self-end">Logout</span>
        </Link>
      </div>
    </nav>
  )
}
