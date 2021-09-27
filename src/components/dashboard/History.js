import { useState, useEffect } from 'react'

import { API, Auth } from 'aws-amplify'

import { recordGamesByDate } from '../../graphql/queries'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'

// import useUser from '../../hooks/useUser'

export const History = () => {
  // const { user } = useUser()
  const [loading, updateLoading] = useState(true)
  const [recordedGames, updateRecordedGames] = useState([])

  useEffect(() => {
    fetchRecordedGamess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchRecordedGamess = async () => {
    try {
      let recordedGameata = await API.graphql({
        query: recordGamesByDate,
        variables: { limit: 100, type: 'RecordGame', sortDirection: 'DESC' },
      })

      updateLoading(false)

      let allRecordedGamess = recordedGameata.data.recordGamesByDate.items

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
        <th className="text-left text-base font-thin py-3 ">
          {game.createdAt.slice(0, 10)}
        </th>
        <th className="text-left text-base font-thin">{game.name}</th>
        <th className="text-left text-base font-thin">
          {formatArray(game.winners)}
        </th>
        <th className="text-left text-base font-thin">
          {formatArray(game.players)}
        </th>
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
            <th className="text-left text-base pb-3">Game Name</th>
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
          <div className="overscroll-auto overflow-auto h-80 flex flex-col gap-6">
            {recordedGameItems.length > 0 ? (
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
