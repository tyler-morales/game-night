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
          Wins: item.wins,
          Loses: item.loses,
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
        <Tooltip
          cursor={{ fill: '#d5f4f6' }}
          wrapperStyle={{
            fontSize: '20px',
            color: 'black',
            textAlign: 'left',
            lineHeight: '25px',
          }}
        />
        <XAxis dataKey="name" style={{ fill: '#fff', fontSize: 20 }} />
        <YAxis style={{ fill: '#fff', fontSize: 20 }} />
        <Legend wrapperStyle={{ fontSize: '20px' }} />
        <Bar dataKey="Wins" fill="#5cd5dd" />
        <Bar dataKey="Loses" fill="#ff3456" />
      </BarChart>
    </ResponsiveContainer>
  )
}
