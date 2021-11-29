import { Dashboard } from '../components/layout/Dashboard'

import protectedRoute from '../components/protectedRoute'

import { Members } from '../components/profile/Members'
import { Games } from '../components/profile/Games'

import useUser from '../hooks/useUser'
import { membersByDate } from '../graphql/queries'

import { API, Auth, withSSRContext } from 'aws-amplify'

export async function getServerSideProps(context) {
  // console.log(context)
  // const { username } = await Auth.currentAuthenticatedUser(context)
  const { API } = withSSRContext(context)

  let membersData

  try {
    membersData = await API.graphql({
      query: membersByDate,
      variables: {
        type: 'Member',
        filter: { owner: { eq: 'moralesfam' } },
        sortDirection: 'ASC',
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
    console.log('✅ membersData: ', membersData)
  } catch (err) {
    console.error('❌ error fetching members: ', err)
  }
  return {
    props: {
      members: membersData ? membersData.data.membersByDate.items : null,
    },
  }
}

function Profile({ members }) {
  // console.log(members.map((member) => member.name))

  const { user } = useUser()

  return (
    <Dashboard>
      {user === null ? (
        <div>Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {/* Account Info */}
          <div className="lg:col-span-2 xl:col-span-1">
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
          <Members members={members} />

          {/* Games */}
          <Games />
        </div>
      )}
    </Dashboard>
  )
}

export default protectedRoute(Profile, '/signin')
