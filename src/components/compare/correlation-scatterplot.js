import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/joy'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { chartTheme } from '../../theme'
import { useCompare } from '@views/dashboard/compare'

//

export const AnalyteCorrelationScatterplot = ({
  data = [],
  analytes = [],
}) => {
  const { abbreviations } = useCompare()
  
  const Tooltip = useCallback(({ node }) => (
    <Box sx={{
      color: 'var(--joy-palette-primary-softColor)',
      background: 'var(--joy-palette-primary-softBg)',
      padding: '12px 16px',
      '.MuiTypography-root': { m: 0 }
    }}>
      <Typography level="title-xs">Sample: { node.data.sample_id }</Typography>
      <Typography level="body-xs">{ abbreviations[0] }: { node.formattedX }</Typography>
      <Typography level="body-xs">{ abbreviations[1] }: { node.formattedY }</Typography>
    </Box>
  ), [analytes[0], analytes[1]])

  Tooltip.propTypes = {
    node: PropTypes.object.isRequired,
  }

  const chartData = useMemo(() => [{
    id: `${ analytes[0] } x ${ analytes[1] }`,
    data: data.reduce((acc, d) => {
      acc.push({
        x: d.original[`${ analytes[0] }_concentration`],
        y: d.original[`${ analytes[1] }_concentration`],
        units: d.original.units,
        sample_id: d.original.sample_id,
      })
      return acc
    }, [])
  }], [analytes, data])

  const units = useMemo(() => {
    const units = chartData[0].data
      .reduce((acc, row) => {
        if (row.units in acc) {
          acc[row.units] += 1
          return acc
        }
        acc[row.units] = 1
        return acc
      }, {})
    // we really only care about the units, not the
    // counts, but we have that available here, too.
    return Object.keys(units)
  }, [chartData])

  return (
    <ResponsiveScatterPlot
      data={ chartData }
      height={ 500 }
      width={ 500 }
      margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
      xScale={{ type: 'linear', min: 0, max: 'auto' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      colors={{ scheme: 'paired' }}
      axisTop={ null }
      axisRight={ null }
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `${ abbreviations[0] } [${ units.join(', ') }]`,
        legendPosition: 'middle',
        legendOffset: 46,
        truncateTickAt: 0
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `${ abbreviations[1] } [${ units.join(', ') }]`,
        legendPosition: 'middle',
        legendOffset: -60,
        truncateTickAt: 0
      }}
      tooltip={ Tooltip }
      theme={ chartTheme }
    />
  )
}

AnalyteCorrelationScatterplot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  analytes: PropTypes.arrayOf(PropTypes.string).isRequired,
}
