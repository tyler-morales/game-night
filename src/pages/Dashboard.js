import React from 'react'
import { DashboardNav } from '../components/DashboardNav'
import { Account } from './Account'

export const Dashboard = () => {
  return (
    <main
      id="dashboard"
      className="flex flex-col md:grid gap-5 grid-cols-1 md:grid-cols-dashboard text-white text-3xl text-center px-5 m-auto"
    >
      <DashboardNav />
      <section className="bg-darkGreen w-full h-full rounded-xl">
        <Account />
      </section>
    </main>
  )
}
