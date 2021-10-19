import { useState, useEffect } from 'react'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'
import { EmptyTileInfo } from '../../layout/EmptyTileInfo'

import useGetRecords from '../../hooks/useGetRecords'

import { ChartPie } from '../charts/ChartPie'
import { ToolTipContent } from '../global/ToolTip'

import { AiOutlineInfoCircle } from 'react-icons/ai'

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

  const info = {
    icon: <AiOutlineInfoCircle />,
    title: 'What is Game Distribution?',
    description: `
    Game Distribution is the percentage of each game your group played over the total number of games played. For example, if you played Monopoly 5 times, but played a total of 20 games (Monopoly, Scarbble etc...), the game distribution for monopoly would be 5/20 or 20%.`,
  }

  return (
    <DashboardItemContainer
      title="Game Distribution"
      info={<ToolTipContent info={info} />}
    >
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
