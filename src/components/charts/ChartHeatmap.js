import { useState, useEffect } from 'react'
import HeatMap from '@uiw/react-heat-map'
// import Tooltip from '@uiw/react-tooltip'

export const ChartHeatmap = ({ period, data }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [selected, setSelected] = useState('')

  console.log(selected)

  const [inHover, setHover] = useState(false)

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

  const SelectedDate = ({ selected }) => {
    const { date, count } = selected
    const today = `${year}/${month + 1}/${day}`

    return (
      <div className="text-left text-base">
        <span>On {date ? date : today}</span>
        <span className="font-bold">
          &nbsp; you played {count ? count : '0'} games.
        </span>
      </div>
    )
  }

  const Tooltip = () => {
    return (
      <div className="bg-white">
        <span>0 games on </span>
        <span>date</span>
      </div>
    )
  }

  return (
    <div className="flex overflow-hidden items-end flex-col w-full">
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
        panelColors={{
          0: '#d5f4f6',
          1: '#80dee5',
          2: '#2cc9d3',
          3: '#49A6AC',
          4: '#1a787f',
        }}
        rectRender={(props, { date, count }) => {
          return (
            <>
              <rect
                {...props}
                onClick={() => {
                  setSelected(data.date === selected ? '' : { date, count })
                }}
                onMouseMove={() => (inHover ? setHover(true) : setHover(false))}
              />
              {inHover && <Tooltip />}
            </>
            // <Tooltip key={props.key} data={`count: ${data.count || 0}`}>
            //   <rect {...props} />
            // </Tooltip>

            // <Tooltip
            //   key={props.key}
            //   placement="top"
            //   content={`${data.count || 0} ${
            //     data.count > 1 ? 'games' : 'game'
            //   } Played on ${data.date} `}
            // >
            // <rect
            //   {...props}
            //   onClick={() => {
            //     setSelected(
            //       data.date === selected ? '' : `${data.date} ${data.count}`
            //     )
            //   }}
            // />
            // </Tooltip>
          )
        }}
      />
      <hr className="border-1 border-white w-full mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 self-start w-full h-full">
        <div className="border-b sm:border-b-0 sm:border-r border-white pb-4 sm:pb-0 sm:pr-4">
          <h3 className="text-sm uppercase font-bold text-left mb-4 ">
            Game Activity Stats
          </h3>
          <SelectedDate selected={selected} />
        </div>

        <div className="pt-4 sm:pt-0 sm:pl-4">
          <h3 className="text-sm uppercase font-bold text-left">Wins</h3>
        </div>
      </div>
    </div>
  )
}
