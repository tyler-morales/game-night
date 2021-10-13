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

  const CustomTooltipContent = (props) => {
    // payload[0] doesn't exist when tooltip isn't visible
    if (props.payload[0] != null) {
      console.log(props.payload[0].payload)
      // mutating props directly is against react's conventions
      // so we create a new payload with the name and value fields set to what we want
      const name = props.payload[0].payload.name
      const Wins = props.payload[0].payload.Wins | 0
      const Loses = props.payload[0].payload.Loses | 0
      // we render the default, but with our overridden payload
      return (
        <div className="bg-white text-primary border-2 border-primary text-base py-3 px-4 rounded-md shadow-lg">
          <span className="font-bold">{name}</span>
          <span className="text-left block text-tertiary">Wins: {Wins}</span>
          <span className="text-left block text-error">Loses: {Loses}</span>
        </div>
      )
    }

    // we just render the default
    return <div>Loading...</div>
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
          content={<CustomTooltipContent />}
          cursor={{ fill: '#fafafa' }}
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
