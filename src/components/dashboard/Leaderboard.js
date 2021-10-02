import { useEffect } from 'react'
import { API } from 'aws-amplify'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

import { listMembers } from '../../graphql/queries'

import useLoading from '../../hooks/useLoading'
import { Chart } from './Chart'

export const Leaderboard = () => {
  const { loading, dataLoaded } = useLoading()

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMemberWins = async () => {
    try {
      dataLoaded()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardItemContainer title="Leaderboard">
      {!loading ? (
        <>
          <div className="md:h-80 flex flex-col gap-6">
            {listMembers.length > 0 ? (
              <Chart />
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
