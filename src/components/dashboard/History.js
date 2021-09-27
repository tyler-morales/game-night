import { useState, useEffect } from 'react'

import { API, Auth } from 'aws-amplify'

import { recordGamesByDate } from '../../graphql/queries'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'

// import useUser from '../../hooks/useUser'

export const History = () => {
  // const { user } = useUser()
  const [recordedGames, updateRecordedGames] = useState([])

  useEffect(() => {
    fetchRecordedGamess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchRecordedGamess = async () => {
    try {
      let recordedGameata = await API.graphql({
        query: recordGamesByDate,
        variables: { limit: 100, type: 'RecordGame', sortDirection: 'ASC' },
      })

      // updateLoading(false)

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

  const GameItem = (game) => {
    return (
      <tr>
        <th>{game.createdAt}</th>
        <th>{game.name}</th>
        <th>{game.winners}</th>
      </tr>
    )
  }

  const recordedGameItems = recordedGames.map((game, index) => {
    const formatArray = (arr) => String(arr).split(',').join(', ')
    return (
      <tr key={index} className="w-full">
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
  })

  const GameTable = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Game Name</th>
            <th>Winners</th>
          </tr>
          {recordedGameItems}
        </tbody>
      </table>
    )
  }

  return (
    <DashboardItemContainer title="Game History">
      <div>
        {recordedGameItems.length > 0 ? (
          <table className="w-full">
            <tbody>
              <tr className="w-full">
                <th className="text-left text-base py-3 ">Date</th>
                <th className="text-left text-base">Game Name</th>
                <th className="text-left text-base">Winners</th>
                <th className="text-left text-base">Players</th>
              </tr>
              {recordedGameItems}
            </tbody>
          </table>
        ) : (
          <span>No Games added</span>
        )}
      </div>
    </DashboardItemContainer>
  )
}
