import { useState, useEffect } from 'react'
import { LandingNav } from './LandingNav'
import { AuthNav } from './AuthNav'

const Nav = () => {
  useEffect(() => {
    renderNav()
  }, [navType])

  const [navType, updateNavType] = useState('landingPage')

  const landingNav = (type) => {
    updateNavType(type)
  }
  const authNav = (type) => {
    updateNavType(type)
  }

  function renderNav() {
    switch (navType) {
      case 'landingPage':
        return <LandingNav landingNav={() => landingNav('landingNav')} />
      case 'auth':
        return <AuthNav authNav={() => authNav('authNav')} />
      default:
        return updateNavType(null)
    }
  }
  return <>{renderNav()}</>
}

export default Nav
