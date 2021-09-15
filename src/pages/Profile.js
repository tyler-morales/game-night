import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Dashboard } from '../layout/Dashboard'

import protectedRoute from './protectedRoute'

function Profile() {
  useEffect(() => {
    checkUser()
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

  return (
    <Dashboard>
      {user === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Profile</h1>
          <h2>Username: {user.username}</h2>
          <h3>Email: {user.email}</h3>
          <h4>Phone: {user.phone_number}</h4>
        </>
      )}
    </Dashboard>
  )
}

export default protectedRoute(Profile)
