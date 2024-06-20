import {
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/joy'
import { useData } from '@context'
import {
  ChemicalDetectionPieChart,
  ChemicalsByMediumRadarChart,
} from '@components/charts'
import { ChartCard } from '@components/dashboard'

export const ChartView = () => {
  const { podmTable: { table } } = useData()

  return (
    <Stack direction="column">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={ 2 }
        divider={ <Divider orientation="vertical" /> }
        sx={{ mb: 2, display: 'inline-flex', height: '32px', }}
      >
        <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
          { table.getPrePaginationRowModel().rows.length } samples
        </Typography>
      </Stack>

      <Grid container spacing={ 2 } sx={{ pr: 2 }}>
        <Grid xs={ 12 } sm={ 12 } md={ 12 } lg={ 11 } xl={ 6 }>
          <ChartCard title="Detection Counts">
            <ChemicalDetectionPieChart data={ table.getPrePaginationRowModel().rows } />
          </ChartCard>
        </Grid>
        <Grid xs={ 12 } sm={ 12 } md={ 12 } lg={ 11 } xl={ 6 }>
          <ChartCard title="Detection Counts by Medium">
            <ChemicalsByMediumRadarChart data={ table.getPrePaginationRowModel().rows } />
          </ChartCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

