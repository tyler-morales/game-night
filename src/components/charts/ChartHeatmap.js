import HeatMap from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

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
    <div>
      <HeatMap
        value={value}
        style={{ width: '100%' }}
        startDate={new Date('2016/01/01')}
        rectRender={(props, data) => {
          // if (!data.count) return <rect {...props} />;
          return (
            <Tooltip
              key={props.key}
              placement="top"
              content={`count: ${data.count || 0}`}
            >
              <rect {...props} />
            </Tooltip>
          )
        }}
      />
    </div>
  )
}
