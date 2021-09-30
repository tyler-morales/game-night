import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Dashboard } from '../layout/Dashboard'

import protectedRoute from './protectedRoute'
import { Grid } from '../components/dashboard/Grid'

const Stats = () => {
  useEffect(() => {
    checkUser()
  }, [])

  const [user, setUser] = useState(null)

  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username }
      setUser(userInfo)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  return (
    <Dashboard>
      <div>{user === null ? <div>Loading...</div> : <Grid />}</div>
    </Dashboard>
  )
}

export default protectedRoute(Stats)
