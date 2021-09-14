import { useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { DashboardNav } from '../components/DashboardNav'

import protectedRoute from './protectedRoute'

const Dashboard = () => {
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
    <main
      id="dashboard"
      className="flex flex-col md:grid gap-5 grid-cols-1 md:grid-cols-dashboard text-white text-3xl text-center px-5 m-auto"
    >
      <DashboardNav />
      <section className="bg-darkGreen w-full h-full rounded-xl">
        <h1>
          {user === null ? (
            <div>Loading...</div>
          ) : (
            <div>Welcome, {user.username}</div>
          )}
        </h1>
      </section>
    </main>
  )
}

export default protectedRoute(Dashboard)
