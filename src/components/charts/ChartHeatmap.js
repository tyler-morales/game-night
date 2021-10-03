import HeatMap from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

export const ChartHeatmap = () => {
  const value = [
    { date: '2021/01/01', count: 1 },
    { date: '2021/01/02', count: 2 },
    { date: '2021/01/03', count: 3 },
    { date: '2021/01/04', count: 4 },
    { date: '2021/01/05', count: 5 },
    { date: '2021/01/11', count: 2 },
    { date: '2021/04/12', count: 2 },
    ...[...Array(56)].map((_, idx) => ({
      date: `2021/08/${idx + 20}`,
      count: (idx += 1),
    })),

    { date: '2021/05/01', count: 5 },
    { date: '2021/05/02', count: 5 },
    { date: '2021/05/03', count: 1 },
    { date: '2021/05/04', count: 6 },
    { date: '2021/05/08', count: 1 },
  ]
  return (
    <div>
      <HeatMap
        value={value}
        style={{ width: '100%', color: 'white' }}
        startDate={new Date('2021/01/01')}
        // endDate={new Date('2021/12/30')}
        // legendCellSize={20}
        // rectSize={18}
        panelColors={{
          0: '#d5f4f6',
          2: '#80dee5',
          3: '#2cc9d3',
          4: '#1a787f',
          5: '#49A6AC',
          30: '#209097',
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
