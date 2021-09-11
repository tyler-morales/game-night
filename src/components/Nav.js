import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) => {
  const { current } = props
  return (
    <div>
      <div selectedKeys={[current]} mode="horizontal">
        <div key="home">
          <Link to={`/`}>Home</Link>
        </div>
        <div key="about">
          <Link to={`/about`}>About</Link>
        </div>
        <div key="profile">
          <Link to="/profile">Profile</Link>
        </div>
        <div key="protected">
          <Link to="/protected">Protected</Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
