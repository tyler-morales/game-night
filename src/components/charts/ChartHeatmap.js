import { useState, useEffect } from 'react'
import HeatMap from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

export const ChartHeatmap = ({ data }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  // Get date info
  const date = new Date()
  let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]

  // Year to date of Current year
  const setDates = (period = 'PREVIOUS_YEAR') => {
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
  }

  useEffect(() => {
    setDates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <HeatMap
        value={data}
        style={{ width: '100%', color: 'white', overflow: 'visible' }}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        legendCellSize={20}
        rectSize={10}
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
              content={`Games Played: ${data.count || 0} | ${data.date} `}
            >
              <rect {...props} />
            </Tooltip>
          )
        }}
      />
    </div>
  )
}
