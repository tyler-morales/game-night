import * as dayjs from 'dayjs'

import { useState, useEffect } from 'react'

import useGetRecords from '../../hooks/useGetRecords'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'
import { EmptyTileInfo } from '../../layout/EmptyTileInfo'

import './tablestyles.css'

export const History = () => {
  const [dateRecords, setDateRecords] = useState([])
  const { data, loading } = useGetRecords()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, dateRecords.length])

  const fetchData = async () => {
    try {
      let records = (await data) ?? []
      setDateRecords(records)
    } catch (err) {
      console.error(err)
    }
  }

  const GameItem = ({ game }) => {
    const formatArray = (arr) => String(arr).split(',').join(', ')

    return (
      <tr className="w-full">
        <td data-th="Date" className="text-left text-base font-thin lg:py-3">
          {window.innerWidth < 400}
          <span>
            &nbsp;&nbsp;
            {new Date(game.createdAt).toLocaleString().split(',')[0]}
          </span>
        </td>
        <td data-th="Name" className="text-left text-base font-thin">
          {window.innerWidth < 400}
          <span>&nbsp;&nbsp;{game.name}</span>
        </td>
        <td data-th="Winner(s)" className="text-left text-base font-thin">
          {window.innerWidth < 400}
          <span>&nbsp;&nbsp;{formatArray(game.winners)}</span>
        </td>
        <td data-th="Players" className="text-left text-base font-thin">
          {window.innerWidth < 400}
          <span>&nbsp;&nbsp;{formatArray(game.players)}</span>
        </td>
      </tr>
    )
  }

  const recordedGameItems = dateRecords.map((game, index) => (
    <GameItem key={index} game={game} />
  ))

  const GameTable = () => {
    return (
      <table className="w-full">
        <tbody>
          <tr className="w-full">
            <th className="text-left text-base pb-3">Date</th>
            <th className="text-left text-base pb-3">Name</th>
            <th className="text-left text-base pb-3">Winners</th>
            <th className="text-left text-base pb-3">Players</th>
          </tr>
          {recordedGameItems}
        </tbody>
      </table>
    )
  }

  return (
    <DashboardItemContainer title="Game History">
      {data ? (
        <div className="overscroll-auto overflow-auto max-h-500 md:h-80 flex flex-col gap-6">
          {data.length !== 0 ? (
            <GameTable />
          ) : (
            <EmptyTileInfo icon="📚" name="Game History" />
          )}
        </div>
      ) : (
        <LoadingRipple />
      )}
    </DashboardItemContainer>
  )
}
