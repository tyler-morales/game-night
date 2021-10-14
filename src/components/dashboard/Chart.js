import useLoadPlays from '../../hooks/useLoadPlays'
import { EmptyTileInfo } from '../../layout/EmptyTileInfo'

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

export const Chart = (gameId) => {
  const { data, loading } = useLoadPlays(gameId)
  const CustomTooltipContent = ({ payload }) => {
    let newPayload = payload
    // payload[0] doesn't exist when tooltip isn't visible
    try {
      if (newPayload) {
        const name = payload[0].payload.name
        const Wins = payload[0].payload.Wins | 0
        const Loses = payload[0].payload.Loses | 0
        return (
          <div className="bg-white text-primary border-2 border-primary text-base py-3 px-4 rounded-md shadow-lg">
            <span className="font-bold">{name}</span>
            <span className="text-left block text-tertiary">Wins: {Wins}</span>
            <span className="text-left block text-error">Loses: {Loses}</span>
          </div>
        )
      }

      // render loading
    } catch (err) {
      console.error(err)
    }

    return <div>Loading...</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {data.length === 0 ? (
        <EmptyTileInfo icon="📊" name="Leaderboard" />
      ) : (
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
      )}
    </ResponsiveContainer>
  )
}
