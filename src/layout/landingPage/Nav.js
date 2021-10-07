import { NavLink } from 'react-router-dom'

import logo from '../../logo.svg'

export const Nav = () => {
  return (
    <nav className="flex justify-between w-full mb-8">
      <img className="w-24 md:w-36" src={logo} alt="Game Night Logo" />
      <div className="flex gap-6 ">
        <NavLink
          to="/dashboard"
          className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary"
        >
          <span>Sign in</span>
        </NavLink>
        <NavLink
          to="/dashboard"
          className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary"
        >
          <span>Sign up</span>
        </NavLink>
      </div>
    </nav>
  )
}
