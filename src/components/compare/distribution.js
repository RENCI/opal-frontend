import { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
} from '@mui/joy'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import { useData } from '@context'

export const Distribution = ({ analyte }) => {
  const { podmTable: { table } } = useData()

  const chartData = useMemo(() => {
    return table.getPrePaginationRowModel().rows
      .reduce((acc, row) => {
        if (row.original[`${ analyte }_concentration`] > 0) {
          acc.push({
            id: row.original.sample_id,
            group: analyte,
            concentration: row.original[`${ analyte }_concentration`],
          })
        }
        return acc
      }, [])
  }, [analyte, table.getPrePaginationRowModel().rows])

  return (
    <Fragment>
      <Typography level="h4">Distribution of { analyte }</Typography>
      <ResponsiveSwarmPlot
        height={ 400 }
        data={ chartData }
        groups={[ analyte ]}
        identity="id"
        value="concentration"
        size={ 2 }
        layout="horizontal"
        forceStrength={ 0.5 }
        simulationIterations={ 100 }
        colors={{ scheme: 'paired' }}
        borderColor={{
          from: 'color',
          modifiers: [
            ['darker', 0.6],
            ['opacity', 0.5]
        ]
        }}
        useMesh={ true }
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${ analyte } Concentration`,
          legendPosition: 'middle',
          legendOffset: 46,
          truncateTickAt: 0
        }}
      />
    </Fragment>
  )
}

Distribution.propTypes = {
  analyte: PropTypes.string.isRequired,
}
