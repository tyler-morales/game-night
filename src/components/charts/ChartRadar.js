import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

export const ChartRadar = () => {
  const data = [
    {
      gameName: 'Monopoly',
      wins: 9,
      loses: 3,
    },
    {
      gameName: 'Life',
      wins: 1,
      loses: 10,
    },
    {
      gameName: 'Chess',
      wins: 4,
      loses: 2,
    },
  ]

  function customTick({ payload, x, y, textAnchor, stroke, radius }) {
    return (
      <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text
          radius={radius}
          fill="white"
          x={x}
          y={y}
          className="recharts-text recharts-polar-angle-axis-tick-value"
          text-anchor={textAnchor}
        >
          <tspan x={x} dy="0em" className="text-sm text-secondary">
            {payload.value}
          </tspan>
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="gameName" tick={customTick} />
        <PolarRadiusAxis style={{ fill: '#fff', fontSize: 14 }} />

        <Radar
          name="name"
          dataKey="wins"
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
