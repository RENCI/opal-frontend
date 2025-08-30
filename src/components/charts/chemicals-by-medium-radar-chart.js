import { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { abbreviate, capitalize } from '@util'
import { usePreferences } from '@context'
import { ResponsiveRadar } from '@nivo/radar'
import { chartTheme } from '../../theme'
import { analytes } from '@data'

//

const GridLabel = memo(function GridLabel({ id, x, y }) {
  const preferences = usePreferences()

  return (
    <g transform={ `translate(${ x }, ${ y })` }>
      <g transform={ `translate(0, 0)` }>
        <text
          textAnchor="middle"
          style={{
            fontSize: 10,
            fontFamily: 'Inter',
            fill: preferences.colorMode.light ? '#333' : '#ddd',
          }}
        >
          { id }
        </text>
      </g>
    </g>
  )
})

GridLabel.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export const ChemicalsByMediumRadarChart = ({ data }) => {
  const preferences = usePreferences()

  // generate array of sampled media from data
  const sampledMedia = useMemo(() => {
    return data
      .reduce((acc, row) => {
        if (!acc.includes(capitalize(row.original.medium))) {
          acc.push(capitalize(row.original.medium))
        }
        return acc
      }, [])
      .sort()
  }, [data.length])
  
  const mediaBuckets = useMemo(() => sampledMedia
    .reduce((acc, medium) => {
      acc[medium] = 0
      return acc
    }, []
  ), [sampledMedia])

  // our goal is counting detections in media in an array like
  //   [
  //      { analyteId: 'pfod', dust: 20, water: 130, ... }
  //      { analyteId: 'pfna', dust: 120, water: 450, ... }
  //      ...
  //   ]
  // for the chart's source data, which we'll index on analyteId.
  const chartData = useMemo(() => {
    if (!analytes) {
      return []
    }
    const analyteBuckets = analytes
      .reduce((acc, analyte) => {
        acc[analyte.id] = {
          analyteId: abbreviate(analyte.id),
          label: abbreviate(analyte.id),
          ...mediaBuckets,
        }
        return acc
      }, {})
    const buckets = data
      .reduce((acc, row) => {
        const medium = capitalize(row.original.medium)
        // for each detected chemical
        Object.keys(analyteBuckets).filter(
          // that is, where concentration > 0,
          analyteId => Number(row.original[`${ analyteId.toLowerCase() }_concentration`]) > 0
          // increase that chemical's count in that medium.
        ).forEach(analyteId => acc[analyteId][medium] += 1)
      return acc
      }, { ...analyteBuckets })
    return Object.values(buckets)
  }, [analytes, data])

  return (
    <ResponsiveRadar
      data={ chartData }
      keys={ sampledMedia }
      indexBy="analyteId"
      margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
      colors={{ scheme: 'tableau10' }}
      fillOpacity={ 0.1 }
      gridLabelOffset={ 25 }
      gridLevels={ 10 }
      gridLabel={ GridLabel }
      dotSize={ 8 }
      dotColor={{ from: 'color' }}
      dotBorderWidth={ 2 }
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: -40,
          translateY: 0,
          itemsSpacing: 4,
          itemWidth: 100,
          itemHeight: 16,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 16,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: preferences.colorMode.light ? '#000' : '#fff',
              }
            }
          ]
        }
      ]}
      theme={ chartTheme }
    />
  )
}

ChemicalsByMediumRadarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
