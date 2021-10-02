import { useState, useEffect } from 'react'
import { API } from 'aws-amplify'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { listWins } from '../../graphql/queries'

export const Chart = (gameId) => {
  const [data, setData] = useState([])

  const fetchMemberWins = async () => {
    try {
      // dataLoaded()

      gameId = '00588874-e054-4154-afd8-736b3a5a3112'

      let filteredWins = await API.graphql({
        query: listWins,
        variables: {
          filter: {
            gameId: { contains: gameId },
          },
        },
      })

      let filteredWinsByGame = filteredWins.data.listWins.items

      filteredWinsByGame = filteredWinsByGame.map((item) => {
        const winnerObject = { name: item.member.name, wins: item.wins }
        return winnerObject
      })

      setData(filteredWinsByGame)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        // width={500}
        // height={300}
        data={data}
        margin={{
          top: 0,
          right: 5,
          left: -25,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{ fill: '#fff', fontSize: 20 }} />
        <YAxis style={{ fill: '#fff', fontSize: 20 }} />
        <Tooltip />
        <Legend style={{ fontSize: 10 }} />
        <Bar dataKey="wins" fill="#5cd5dd" />
      </BarChart>
    </ResponsiveContainer>
  )
}
