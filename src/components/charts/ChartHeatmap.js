import { useState, useEffect } from 'react'
import HeatMap from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

export const ChartHeatmap = ({ period, data }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [selected, setSelected] = useState('')

  // Get date info
  const date = new Date()
  let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]

  useEffect(() => {
    // Year to date of Current year
    if (period === 'YEAR_TO_DATE') {
      const newYear = `${year}/01/01`
      const lastDay = `${year}/12/31`

      setStartDate(newYear)
      setEndDate(lastDay)
    }

    // Past year Year prior - Current date
    if (period === 'PREVIOUS_YEAR') {
      const today = `${year}/${month + 1}/${day}`
      const oneYearAgo = `${year - 1}/${month + 1}/${day}`

      setStartDate(oneYearAgo)
      setEndDate(today)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  return (
    // <div className="flex items-end flex-col overflow-hidden">
    <div className="card-2">
      <HeatMap
        value={data}
        style={{ color: 'white' }}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        legendCellSize={20}
        rectSize={10}
        width={675}
        legendRender={(props) => <rect {...props} y={props.y + 5} rx="2" />}
        rectProps={{
          rx: 2,
        }}
        // weekLables={[]}
        panelColors={{
          0: '#d5f4f6',
          1: '#80dee5',
          2: '#2cc9d3',
          3: '#49A6AC',
          4: '#1a787f',
        }}
        rectRender={(props, data) => {
          return (
            <Tooltip
              key={props.key}
              placement="top"
              content={`${data.count || 0} ${
                data.count > 1 ? 'games' : 'game'
              } Played on ${data.date} `}
            >
              <rect
                {...props}
                onClick={() => {
                  setSelected(data.date === selected ? '' : data.date)
                }}
              />
            </Tooltip>
          )
        }}
      />
    </div>
  )
}
