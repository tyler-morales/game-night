import React, { useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { Dashboard } from '../layout/Dashboard'
import { AuthForm } from '../components/authFlow/AuthForm'

function Profile() {
  // handle sign out
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
  function signOut() {
    Auth.signOut().catch((err) => console.log('error signing out: ', err))
  }
  if (user) {
    return (
      <Dashboard>
        <h1>Profile</h1>
        <h2>Username: {user.username}</h2>
        <h3>Email: {user.email}</h3>
        <h4>Phone: {user.phone_number}</h4>
        <button onClick={signOut}>Sign Out</button>
      </Dashboard>
    )
  }
  return <AuthForm setUser={setUser} />
}

export default Profile
