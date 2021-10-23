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
      name: '10/20',
      Tyler: 1,
      Sonia: 0,
      Pedro: 0,
    },
    {
      name: '10/21',
      Tyler: 0.5,
      Sonia: 0,
      Pedro: 0.5,
    },
    {
      name: '10/22',
      Tyler: 0.333,
      Sonia: 0.333,
      Pedro: 0.666,
    },
    {
      name: '10/23',
      Tyler: 0.5,
      Sonia: 0.25,
      Pedro: 0.75,
    },
    {
      name: '10/23',
      Tyler: 0.5,
      Sonia: 0.25,
      Pedro: 0.75,
    },
  ]

  const CustomizedAxisTick = (props) => {
    const { x, y, stroke, payload } = props

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          className="text-base"
          x={7}
          y={5}
          dy={16}
          textAnchor="end"
          fill="#fff"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {data.length === 0 ? (
        <EmptyTileInfo icon="📊" name="Winning Average" />
      ) : (
        <LineChart
          data={data}
          margin={{
            right: 5,
            left: -10,
            top: 5,
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
                  {payload &&
                    payload[0] != null &&
                    payload[0].payload.Tyler | 0}
                </span>
              </div>
            )}
          />
          <XAxis
            height={50}
            dataKey="name"
            tick={<CustomizedAxisTick />}
            style={{
              fontSize: 18,
            }}
          />
          <YAxis style={{ fill: '#fff', fontSize: 20 }} />
          <Legend wrapperStyle={{ fontSize: '20px' }} />
          <Line dataKey="Tyler" fill="#5cd5dd" />
          <Line dataKey="Sonia" fill="#ff3456" />
        </LineChart>
      )}
    </ResponsiveContainer>
  )
}
