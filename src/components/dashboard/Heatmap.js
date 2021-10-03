import { useState, useEffect } from 'react'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

// import useLoading from '../../hooks/useLoading'
import useGetRecords from '../../hooks/useGetRecords'
import { ChartHeatmap } from '../charts/ChartHeatmap'

export const Heatmap = () => {
  // const { loading, dataLoaded } = useLoading()
  const [dateRecords, setDateRecords] = useState()
  const { data, loading } = useGetRecords()

  useEffect(() => {
    fetchMemberWins()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const fetchMemberWins = async () => {
    try {
      let records = await data

      records = records.map((item) =>
        [item.createdAt.split('T')[0]].map((item) => item.replaceAll('-', '/'))
      )

      records = records.flat()

      const arrayOfOccurrenceObjects = Object.values(
        records.reduce((acc, el) => {
          if (!acc[el]) acc[el] = { date: el, count: 0 }
          acc[el].count++
          return acc
        }, {})
      )

      setDateRecords(() => [...arrayOfOccurrenceObjects])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardItemContainer title="Calendar">
      {!loading ? (
        <div>
          <div className="md:h-80 flex flex-col gap-6">
            {true ? (
              <ChartHeatmap data={dateRecords} />
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
        </div>
      ) : (
        <LoadingRipple />
      )}
    </DashboardItemContainer>
  )
}
