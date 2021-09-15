import { useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { Dashboard } from '../layout/Dashboard'

import protectedRoute from './protectedRoute'

const Stats = () => {
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

  return (
    <Dashboard>
      <h1>
        {user === null ? (
          <div>Loading...</div>
        ) : (
          <div>Welcome, {user.username}</div>
        )}
      </h1>
    </Dashboard>
  )
}

export default protectedRoute(Stats)
