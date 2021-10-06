import { NavLink } from 'react-router-dom'
import HeroImage from '../../Hero-image.png'

export const Hero = () => {
  return (
    <header>
      <h1 className="text-white text-5xl md:text-8xl text-center font-bold">
        Game Night
      </h1>
      <h2 className="text-white text-center text-xl md:text-2xl mt-6 font-body font-light">
        Taking the hassle out of game night
      </h2>
      <img
        className="md:m-auto w-full h-auto border-2 border-white rounded-md mt-6 md:mt-14 shadow-light md:shadow-base"
        src={HeroImage}
        alt="Dashboard Preview"
      />
      <h3 className="text-white font-light font-body text-center text-base md:text-lg mt-14">
        Ready to upgrade your game ledger?
      </h3>
      <NavLink
        to="/dashboard"
        className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center"
      >
        <span>Create an Account</span>
      </NavLink>
    </header>
  )
}
