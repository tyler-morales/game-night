import { useEffect } from 'react'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

import useLoading from '../../hooks/useLoading'
import useLoadRecords from '../../hooks/useLoadRecords'
import { ChartPie } from '../charts/ChartPie'

export const GameDistribution = () => {
  const { loading, dataLoaded } = useLoading()
  const { records } = useLoadRecords()
  let data = records

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
    <DashboardItemContainer title="Game Distribution">
      {!loading ? (
        <>
          <div className="h-80 flex flex-col gap-6">
            {data !== undefined ? (
              <ChartPie data={data} />
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
