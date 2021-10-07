import { useState, useEffect } from 'react'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'
import { EmptyTileInfo } from '../../layout/EmptyTileInfo'

import useGetRecords from '../../hooks/useGetRecords'

import { ChartPie } from '../charts/ChartPie'

export const GameDistribution = () => {
  const [games, setGames] = useState(0)
  const { data, loading } = useGetRecords()

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data])

  const fetchMemberWins = async () => {
    try {
      let records = await data

      records = await records.map((record) => record.name)

      const arrayOfOccurrenceObjects = Object.values(
        records.reduce((acc, el) => {
          if (!acc[el]) acc[el] = { name: el, value: 0 }
          acc[el].value++
          return acc
        }, {})
      )

      setGames(() => [...arrayOfOccurrenceObjects])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardItemContainer title="Game Distribution">
      {games ? (
        <>
          <div className="h-80 flex flex-col gap-6">
            {games.length > 0 ? (
              <ChartPie data={games} />
            ) : (
              <EmptyTileInfo icon="🎲" name="Game Distribution" />
            )}
          </div>
        </>
      ) : (
        <LoadingRipple />
      )}
    </DashboardItemContainer>
  )
}
