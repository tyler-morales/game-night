import { useState, useEffect } from 'react'

import { API, Auth } from 'aws-amplify'

import { recordGamesByDate } from '../../graphql/queries'

import useLoading from '../../hooks/useLoading'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

import './tablestyles.css'

export const History = () => {
  const { dataLoaded, loading } = useLoading()
  const [recordedGames, updateRecordedGames] = useState([])

  useEffect(() => {
    fetchRecordedGamess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchRecordedGamess = async () => {
    try {
      dataLoaded()

      let recordedGamedata = await API.graphql({
        query: recordGamesByDate,
        variables: { limit: 100, type: 'RecordGame', sortDirection: 'DESC' },
      })

      let allRecordedGamess = recordedGamedata.data.recordGamesByDate.items

      /* update the members array in the local state */
      setFilteredRecordedGamess(allRecordedGamess)
    } catch (err) {
      console.error(err)
    }
  }

  const setFilteredRecordedGamess = async (allRecordedGamess) => {
    const { username } = await Auth.currentAuthenticatedUser()

    const myRecordedGamesData = allRecordedGamess.filter(
      (p) => p.owner === username
    )

    updateRecordedGames(myRecordedGamesData)
  }

  const GameItem = ({ game }) => {
    const formatArray = (arr) => String(arr).split(',').join(', ')

    return (
      <tr className="w-full">
        <td data-th="Date" className="text-left text-base font-thin lg:py-3">
          {/* TODO: When screen is less than 480 px, put two spaces in the span elements &nbsp;&nbsp; */}
          <span>{game.createdAt.slice(0, 10)}</span>
        </td>
        <td data-th="Name" className="text-left text-base font-thin">
          <span>{game.name}</span>
        </td>
        <td data-th="Winner" className="text-left text-base font-thin">
          <span>{formatArray(game.winners)}</span>
        </td>
        <td data-th="Players" className="text-left text-base font-thin">
          <span>{formatArray(game.players)}</span>
        </td>
      </tr>
    )
  }

  const recordedGameItems = recordedGames.map((game, index) => (
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
      {!loading ? (
        <>
          <div className="overscroll-auto overflow-auto max-h-500 md:h-80 flex flex-col gap-6">
            {recordedGameItems.length !== 0 ? (
              <GameTable />
            ) : (
              <div className="flex flex-col gap-4 bg-primary rounded-lg p-8 ">
                <h4 className="text-2xl border-b-2 border-quad pb-4">
                  You haven't played any games
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
