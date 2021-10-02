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

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  const fetchMemberWins = async () => {
    try {
      let filteredWins = await API.graphql({
        query: listWins,
        variables: {
          filter: {
            gameId: { contains: gameId.value },
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
