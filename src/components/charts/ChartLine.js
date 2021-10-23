import useLoadPlays from '../../hooks/useLoadPlays'
import { EmptyTileInfo } from '../../layout/EmptyTileInfo'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const ChartLine = () => {
  // const { data } = useLoadPlays(gameId)
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      {data.length === 0 ? (
        <EmptyTileInfo icon="📊" name="Winning Average" />
      ) : (
        <LineChart
          data={data}
          margin={{
            right: 5,
            left: -25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            cursor={{ fill: '#fafafa' }}
            content={({ payload }) => (
              <div className="bg-white text-primary border-2 border-primary text-base py-3 px-4 rounded-md shadow-lg">
                <span className="font-bold">
                  {payload && payload[0] != null && payload[0].payload.name}
                </span>
                <span className="text-left block text-tertiary">
                  Avg:{' '}
                  {payload && payload[0] != null && payload[0].payload.uv | 0}
                </span>
              </div>
            )}
          />
          <XAxis dataKey="name" style={{ fill: '#fff', fontSize: 20 }} />
          <YAxis style={{ fill: '#fff', fontSize: 20 }} />
          <Legend wrapperStyle={{ fontSize: '20px' }} />
          <Line dataKey="uv" fill="#5cd5dd" />
          <Line dataKey="pv" fill="#ff3456" />
        </LineChart>
      )}
    </ResponsiveContainer>
  )
}
