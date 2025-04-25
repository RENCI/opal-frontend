import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Typography } from '@mui/joy'
import { usePreferences } from '@context'
import { ResponsivePie } from '@nivo/pie'
import { chartTheme } from '../../theme'
import { analytes } from '@data'
import { abbreviate } from '@util'

const Tooltip = ({ datum }) => {
  return (
    <Box sx={{
      backgroundColor: 'var(--joy-palette-background-surface)',
      color: 'var(--joy-palette-info-contrastText)',
      border: `1px solid var(--joy-palette-neutral-outlinedColor)`,
      filter: 'brightness(1.1)',
    }}>
      <Typography level="title-sm" sx={{ p: 1 }}>{ datum.label }</Typography>
      <Divider />
      <Typography level="body-sm" sx={{ p: 1, fontWeight: 'bold' }}>{ datum.value }</Typography>
    </Box>
  )
}

Tooltip.propTypes = {
  datum: PropTypes.object.isRequired,
}

//

export const ChemicalDetectionPieChart = ({ data }) => {
  const preferences = usePreferences()

  const emptyChemicalBuckets = useMemo(() => analytes
    .reduce((acc, analyte) => {
      acc[analyte.id] = 0;
      return acc;
    }, {}), [analytes]);

  const detectedChemicals = useCallback(row => {
    return analytes.reduce((acc, analyte) => {
      if (row.original[`${ analyte.id }_concentration`] > 0) {
        acc.push(analyte.id)
      }
      return acc
    }, [])
  }, [analytes])

  const chemicalBuckets = useMemo(() => data
    .reduce((acc, row) => {
      detectedChemicals(row).forEach(analyteId => {
        acc[analyteId] += 1
      })
      return acc
  }, { ...emptyChemicalBuckets }), [data])

  const chartData = useMemo(() => {
    if (!chemicalBuckets) {
      return []
    }
    return Object.keys(chemicalBuckets)
      .sort()
      .map(analyteId => ({
        id: analyteId,
        label: abbreviate(analyteId),
        value: chemicalBuckets[analyteId],
      }))
  }, [chemicalBuckets, data])


  if (!Object.keys(chemicalBuckets).length === 0) {
    return null
  }

  return (
    <ResponsivePie
      key={ chartData.length }
      data={ chartData }
      margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
      innerRadius={ 0.5 }
      padAngle={ 1 }
      arcLabelsSkipAngle={ 10 }
      arcLinkLabel={ d => abbreviate(d.id) }
      arcLinkLabelsTextColor={ preferences.colorMode.light ? '#333' : '#ddd' }
      colors={{ scheme: 'tableau10' }}
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: -60,
          translateY: 0,
          itemsSpacing: 4,
          itemWidth: 50,
          itemHeight: 16,
          itemTextColor: '#999',
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
      tooltip={ Tooltip }
    />
  )
}

ChemicalDetectionPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}