import { useEffect } from 'react'

import useLoadWinRatio from '../../hooks/useLoadWinRatio'
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

export const ChartLine = (gameId) => {
  const { data } = useLoadWinRatio(gameId)
  console.log(data)
  // const data = [
  //   {
  //     date: '10/20',
  //     Tyler: 1,
  //     Sonia: 0,
  //     Pedro: 0,
  //   },
  //   {
  //     date: '10/21',
  //     Tyler: 0.5,
  //     Sonia: 0,
  //     Pedro: 0.5,
  // ]

  const colors = [
    '#ff0000',
    '#ffd300',
    '#0aff99',
    '#0aefff',
    '#580aff',
    '#fafafa',
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

  useEffect(() => {
    calculateLinesToDraw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const allNames = (data, filterKey) => {
    let allNames = []

    // This makes sure you get each array and then strips just the keys as desired
    data.forEach((item) => {
      allNames = allNames.concat(Object.keys(item))
    })

    // This creates the set, strips our dups, and then spreads itself into an array
    return [...new Set(allNames)].filter((res) => res !== filterKey)
  }

  const calculateLinesToDraw = (data) => {
    try {
      return allNames(data, 'date').map((player, index) => {
        return (
          <Line
            key={index}
            dataKey={player}
            stroke={colors[index]}
            strokeWidth="4"
          />
        )
      })
    } catch (err) {
      console.error(err)
    }
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
              <div className="bg-primary text-white border-2 border-white text-base py-3 px-4 rounded-md shadow-lg">
                {/* Date */}
                <span className="font-bold">
                  {payload && payload[0] != null && payload[0].payload.date}
                </span>

                {/* Player Winning Averages */}
                {payload.map((player, index) => {
                  return (
                    <span key={index} className="text-left block">
                      <span style={{ color: colors[index], fontWeight: '700' }}>
                        {player.name}:{` `}
                      </span>
                      {player.value}
                    </span>
                  )
                })}
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

          {calculateLinesToDraw(data)}
        </LineChart>
      )}
    </ResponsiveContainer>
  )
}
