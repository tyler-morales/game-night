import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts'

export const ChartPie = ({ data }) => {
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    data,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="#000022"
        style={{ fontSize: '20px' }}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {data !== undefined && (
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            dataKey="value"
            fill="#5cd5dd"
          ></Pie>
        )}
        <Tooltip wrapperStyle={{ fontSize: '20px' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
