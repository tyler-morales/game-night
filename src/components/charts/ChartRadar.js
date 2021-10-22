import { useState, useEffect } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import useLoadRecords from '../../hooks/useGetRecords'

export const ChartRadar = () => {
  const { data } = useLoadRecords()
  const [days, setDays] = useState('')

  useEffect(() => {
    fetchRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const fetchRecords = async () => {
    try {
      let array = (await data) ?? []

      array = array.map(({ createdAt }) => {
        const dayName = new Date(createdAt).toLocaleDateString('en-US', {
          weekday: 'long',
        })

        return dayName
      })

      const arrayOfOccurrenceObjects = Object.values(
        array.reduce((acc, el) => {
          if (!acc[el]) acc[el] = { day: el, plays: 0 }
          acc[el].plays++
          return acc
        }, {})
      )

      setDays(arrayOfOccurrenceObjects)
    } catch (err) {
      console.error(err)
    }
  }

  function customTick({ payload, x, y, textAnchor, radius }) {
    return (
      <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text radius={radius} fill="white" x={x} y={y} text-anchor={textAnchor}>
          <tspan x={x} dy="0em" className="text-sm text-secondary">
            {payload.value}
          </tspan>
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={days}>
        <PolarGrid />
        <PolarAngleAxis dataKey="day" tick={customTick} />
        <PolarRadiusAxis style={{ fill: '#fff', fontSize: 14 }} />
        <Tooltip
          content={({ payload }) => (
            <div className="bg-white text-primary border-2 border-primary text-base py-3 px-4 rounded-md shadow-lg">
              <span className="font-bold">
                {payload && payload[0] != null && payload[0].payload.day}
              </span>
              <span className="text-left block text-tertiary">
                Plays:{' '}
                {payload && payload[0] != null && payload[0].payload.plays | 0}
              </span>
            </div>
          )}
        />
        <Radar
          name="name"
          dataKey="plays"
          stroke="white"
          fill="green"
          fillOpacity={0.6}
        />
        <Radar
          name="loses"
          dataKey="loses"
          stroke="white"
          fill="red"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
