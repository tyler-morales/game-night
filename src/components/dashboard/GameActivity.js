import { useState, useEffect } from 'react'

import { DashboardItemContainer } from '../../layout/DashboardItemContainer'
import { LoadingRipple } from '../loadingIndicator/LoadingRipple'
import { EmptyTileInfo } from '../../layout/EmptyTileInfo'
import { ChartHeatmap } from '../charts/ChartHeatmap'

import useGetRecords from '../../hooks/useGetRecords'

export const GameActivity = () => {
  const [dateRecords, setDateRecords] = useState(0)
  const { data, loading } = useGetRecords()

  const [selectOption, setSelectOption] = useState('YEAR_TO_DATE')
  const [optionName, setOptionName] = useState()

  useEffect(() => {
    fetchMemberWins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data])

  const fetchMemberWins = async () => {
    try {
      let records = await data

      records = records.map((item) =>
        [item.createdAt.split('T')[0]].map((item) => item.replaceAll('-', '/'))
      )

      records = records.flat()

      const arrayOfOccurrenceObjects = Object.values(
        records.reduce((acc, el) => {
          if (!acc[el]) acc[el] = { date: el, count: 0 }
          acc[el].count++
          return acc
        }, {})
      )

      setDateRecords(() => [...arrayOfOccurrenceObjects])
    } catch (err) {
      console.error(err)
    }
  }

  const Options = () => {
    const handleChange = (e) => {
      setSelectOption(e.target.value)
      setOptionName(e.target.value)
    }

    return (
      <select
        onChange={handleChange}
        className="ring-offset-primary ring-offset-2 focus:ring-quad focus:outline-none focus:ring-2 bg-quad rounded-md text-base text-primary px-2 py-1 w-full md:w-52"
        name="heatMapDateSelection"
        id="heatmap-date-select"
        value={optionName}
      >
        <option value="YEAR_TO_DATE">2021</option>
        <option value="PREVIOUS_YEAR">Past Year</option>
      </select>
    )
  }

  return (
    <DashboardItemContainer title="Game Activity" options={<Options />}>
      {dateRecords ? (
        <div className="xl:h-80 flex flex-col gap-6">
          {dateRecords.length > 0 ? (
            <div className="max-w-675">
              <ChartHeatmap period={selectOption} data={dateRecords} />
            </div>
          ) : (
            <EmptyTileInfo icon="🔥" name="Game Activity" />
          )}
        </div>
      ) : (
        <LoadingRipple />
      )}
    </DashboardItemContainer>
  )
}
