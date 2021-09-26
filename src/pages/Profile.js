import { Dashboard } from '../layout/Dashboard'

import protectedRoute from './protectedRoute'

import { Members } from '../components/profile/Members'
import { Games } from '../components/profile/Games'

import useUser from '../hooks/useUser'

function Profile() {
  const { user } = useUser()

  return (
    <Dashboard>
      {user === null ? (
        <div>Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {/* Account Info */}
          <div>
            <h2 className="text-white text-2xl text-left mb-5">Account Info</h2>
            <div className="flex flex-col gap-3 bg-primary p-5 text-left rounded-lg shadow-lg">
              {/* TODO: Add dyamic avatar */}
              <div className="flex justify-center items-center bg-quad text-center rounded-full h-28 w-28 m-auto mb-4">
                <span>{user.username.substring(0, 2).toUpperCase()}</span>
              </div>
              <h3 className="text-white text-base">
                Account Name: {user.username}
              </h3>
              <h3 className="text-white text-base">Email: {user.email}</h3>
            </div>
          </div>

          {/* Members */}
          <Members />

          {/* Games */}
          <Games />
        </div>
      )}
    </Dashboard>
  )
}

export default protectedRoute(Profile)
