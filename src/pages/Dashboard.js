import React from 'react'
import { DashboardNav } from '../components/DashboardNav'
import useAuth from '../hooks/useAuth'

export const Dashboard = () => {
  const { currentUser } = useAuth()

  return (
    <main
      id="dashboard"
      className="flex flex-col md:grid gap-5 grid-cols-1 md:grid-cols-dashboard text-white text-3xl text-center px-5 m-auto"
    >
      <DashboardNav />
      <section className="bg-darkGreen w-full h-full rounded-xl">
        <h1>
          {currentUser === null ? (
            <div>Loading...</div>
          ) : (
            <div>Welcome, {currentUser.username}</div>
          )}
        </h1>
      </section>
    </main>
  )
}
