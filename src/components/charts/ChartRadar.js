import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
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
      wins: 3,
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
        <Tooltip
          content={({ payload }) => (
            <div className="bg-white text-primary border-2 border-primary text-base py-3 px-4 rounded-md shadow-lg">
              <span className="font-bold">
                {payload && payload[0] != null && payload[0].payload.gameName}
              </span>
              <span className="text-left block text-tertiary">
                Wins:{' '}
                {payload && payload[0] != null && payload[0].payload.wins | 0}
              </span>
              <span className="text-left block text-error">
                Loses:{' '}
                {payload && payload[0] != null && payload[0].payload.loses | 0}
              </span>
            </div>
          )}
        />
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
