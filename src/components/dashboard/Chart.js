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

import { listPlays } from '../../graphql/queries'

export const Chart = (gameId) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchMemberPlays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  const fetchMemberPlays = async () => {
    try {
      let filteredPlays = await API.graphql({
        query: listPlays,
        variables: {
          filter: {
            gameId: { contains: gameId.value },
          },
        },
      })

      let filteredPlaysByGame = filteredPlays.data.listPlays.items

      filteredPlaysByGame = filteredPlaysByGame.map((item) => {
        const winnerObject = {
          name: item.member.name,
          Plays: item.wins,
        }
        return winnerObject
      })

      setData(filteredPlaysByGame)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          right: 5,
          left: -25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{ fill: '#fff', fontSize: 20 }} />
        <YAxis style={{ fill: '#fff', fontSize: 20 }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: '20px' }} />
        <Bar dataKey="Plays" fill="#5cd5dd" />
      </BarChart>
    </ResponsiveContainer>
  )
}
