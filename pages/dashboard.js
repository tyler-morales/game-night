import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'

import { Dashboard } from '../components/layout/Dashboard'
import { Grid } from '../components/dashboard/Grid'

import protectedRoute from '../components/protectedRoute'
import { LoadingRipple } from '../components/loadingIndicator/LoadingRipple'

const Stats = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username }
      setUser(userInfo)
    } catch (err) {
      console.error('error: ', err)
    }
  }

  return (
    <Dashboard>
      <div>
        {user === null ? (
          <div>
            <LoadingRipple />
          </div>
        ) : (
          <Grid />
        )}
      </div>
    </Dashboard>
  )
}

export default protectedRoute(Stats, '/signin')
