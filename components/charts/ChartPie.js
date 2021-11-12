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

  const CustomTooltipContent = ({ payload }) => {
    let newPayload = payload

    // payload[0] doesn't exist when tooltip isn't visible
    if (newPayload[0] != null) {
      const name = payload[0].payload.name
      const value = payload[0].payload.value
      return (
        <div className="bg-white text-primary border-2 border-primary text-base py-3 px-4 rounded-md shadow-lg">
          <span className="font-bold">{name}</span>
          <span className="block">Games: {value}</span>
        </div>
      )
    }

    // render loading
    return <div>Loading...</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="100%"
          dataKey="value"
          fill="#5cd5dd"
        ></Pie>
        <Tooltip
          content={<CustomTooltipContent />}
          // cursor={{ fill: 'orange', color: 'red' }}
          // wrapperStyle={{ fontSize: '20px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
