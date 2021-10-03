import React from 'react'
import HeatMap from '@uiw/react-heat-map';

export const ChartHeatmap = () => {
  const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/04/12', count: 2 },
    { date: '2016/05/01', count: 5 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/05/03', count: 1 },
    { date: '2016/05/04', count: 11 },
    { date: '2016/05/08', count: 32 },
  ]
  return (
    <HeatMap
      value={value}
      width={600}
      style={{ color: '#ad001d' }}
      startDate={new Date('2016/01/01')}
      panelColors={{
        0: '#f4decd',
        2: '#e4b293',
        4: '#d48462',
        10: '#c2533a',
        20: '#ad001d',
        30: '#000',
      }}
    />
  )
}
