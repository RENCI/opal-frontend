import {
  Grid,
  Stack,
  Typography,
} from '@mui/joy'
import { Toolbar } from '@components/layout'
import { useData } from '@context'
import {
  ChemicalDetectionPieChart,
  ChemicalsByMediumRadarChart,
} from '@components/charts'
import { ChartCard } from '@components/chart-card'

//

export const ChartView = () => {
  const { podmTable: { table } } = useData()

  return (
    <Stack direction="column">
      <Toolbar>
        <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
          { table.getPrePaginationRowModel().rows.length } samples
        </Typography>
      </Toolbar>

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

