import { useState, useEffect } from 'react'
import HeatMap from '@uiw/react-heat-map'
import useLoadSpecficRecords from '../../hooks/useLoadSpecficRecords'

export const ChartHeatmap = ({ period, data }) => {
  // Get date info
  const date = new Date()
  let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [selected, setSelected] = useState(`${year}/${month + 1}/${day}`)
  const { games } = useLoadSpecficRecords(selected)

  // console.log(selected)

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
        <span>
          On <span className="font-bold">{date ? date : today}</span>
        </span>
        <span>
          &nbsp; you played{' '}
          <span className="font-bold">{count ? count : '0'} </span>
          {count === 1 ? 'game' : 'games'}
        </span>
        <ul className="mt-2">
          {games.map((item, index) => {
            return (
              <li className="mb-2" key={index}>
                <h4 className="font-bold text-quad">{item.gameName}</h4>
                <ul>
                  <span>Players: </span>
                  {item.players.map((player, index) => {
                    return (
                      <li
                        key={index}
                        className="font-bold inline text-sm text-white mr-2"
                      >
                        {player}
                      </li>
                    )
                  })}
                </ul>
                <ul>
                  <span>Winner(s): </span>
                  {item.winners.map((winner, index) => {
                    return (
                      <li
                        key={index}
                        className="font-bold inline text-sm text-white mr-2"
                      >
                        {winner}
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
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
              />
            </>
          )
        }}
      />
      <hr className="border-1 border-white w-full" />

      {/* TODO: Add members and filter below data by member */}
      {/* <div className="self-start mt-4 mb-6 flex gap-3">
        <span className="text-sm border-2 border-quad rounded-lg py-2 px-3">
          MoralesFam
        </span>
      </div> */}

      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 self-start w-full min-h-170">
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
