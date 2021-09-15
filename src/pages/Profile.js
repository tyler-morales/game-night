import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Dashboard } from '../layout/Dashboard'

import protectedRoute from './protectedRoute'

import { FiTool } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'

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
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Account Info */}
          <div>
            <h2 className="text-white text-2xl text-left mb-5">Account Info</h2>
            <div className="flex flex-col gap-3 bg-primary p-5 text-left rounded-lg">
              <h3 className="text-white text-base">
                Account Name: {user.username}
              </h3>
              <h3 className="text-white text-base">Email: {user.email}</h3>
            </div>
          </div>

          {/* Members */}
          <div>
            <h2 className="text-white text-2xl text-left mb-5">Members</h2>
            <div className="flex justify-between bg-primary p-5 text-left rounded-lg border-2 border-white">
              <h3 className="text-white text-base">Tyler</h3>
              <div className="flex gap-3">
                <FiTool className="cursor-pointer" size=".75em" />
                <RiDeleteBinLine className="cursor-pointer" size=".75em" />
              </div>
            </div>
          </div>

          {/* Games */}
          <div>
            <h2 className="text-white text-2xl text-left mb-5">Your Games</h2>
            <div className="flex justify-between bg-primary p-5 text-left rounded-lg border-2 border-white">
              <h3 className="text-white text-base">Dominoes</h3>
              <div className="flex gap-3">
                <FiTool className="cursor-pointer" size=".75em" />
                <RiDeleteBinLine className="cursor-pointer" size=".75em" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Dashboard>
  )
}

export default protectedRoute(Profile)
