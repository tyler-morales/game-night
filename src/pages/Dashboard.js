import React from 'react'
import { DashboardNav } from '../components/DashboardNav'

export const Dashboard = () => {
  return (
    <main
      id="dashboard"
      className="grid gap-5 md:grid-cols-dashboard text-white text-3xl text-center px-5 m-auto"
    >
      <DashboardNav />
      <section className="bg-darkGreen w-full h-full rounded-xl">
        Dashboard Section
      </section>
    </main>
  )
}
