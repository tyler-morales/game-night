import { NavLink } from 'react-router-dom'
import HeroImage from '../../Hero-image.png'
import HeroImageMobile from '../../Hero-image-mobile.png'

export const Hero = () => {
  return (
    <header>
      <h1
        data-aos="fade-in"
        data-aos-delay="50"
        className="gradient m-auto text-5xl w-max md:text-8xl text-center font-bold pb-2"
      >
        Game Night
      </h1>
      <h2
        data-aos="fade-in"
        data-aos-delay="150"
        className="text-white text-center text-xl md:text-2xl mt-6 font-body font-light"
      >
        Taking the hassle out of game night
      </h2>
      <img
        data-aos="fade-up"
        data-aos-delay="350"
        className="md:m-auto w-full h-auto border-2 border-white rounded-2xl mt-6 md:mt-14 shadow-light md:shadow-base"
        srcset={`${HeroImage}, ${HeroImageMobile} 414w`}
        src={HeroImage}
        alt="Dashboard Preview"
      />
      <div data-aos="fade-in">
        <h3 className="text-white font-light font-body text-center text-base md:text-lg mt-14 lg:mt-20">
          Ready to upgrade your game ledger?
        </h3>
        <NavLink
          to="/sign-up"
          className="text-lg py-2 px-4 bg-secondary text-primary rounded-md mt-4 md:mt-8 block w-max m-auto text-center focus-secondary"
        >
          <span>Create an Account</span>
        </NavLink>
      </div>
    </header>
  )
}
