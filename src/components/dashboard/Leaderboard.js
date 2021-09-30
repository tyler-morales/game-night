import { useEffect } from 'react'
import { API } from 'aws-amplify'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

import { listMembers } from '../../graphql/queries'

import useLoading from '../../hooks/useLoading'

export const Leaderboard = () => {
  const { loading, dataLoaded } = useLoading()

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMemberWins = async () => {
    try {
      dataLoaded()

      let allMembers = await API.graphql({
        query: listMembers,
        variables: { limit: 100, type: 'Member' },
      })
      console.log(allMembers)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <DashboardItemContainer title="Leaderboard">
      {!loading ? (
        <>
          <div className="overscroll-auto overflow-auto h-5/6 md:h-80 flex flex-col gap-6">
            {listMembers.length > 0 ? (
              <div>Chart</div>
            ) : (
              <div className="flex flex-col gap-4 bg-primary rounded-lg p-8 ">
                <h4 className="text-2xl border-b-2 border-quad pb-4">
                  You haven't played any games to update the Leaderboard
                </h4>
                <p className="text-sm">
                  💡 Click the Record a Game button to record your first game!
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <LoadingRipple />
      )}
    </DashboardItemContainer>
  )
}
