import {
  Grid,
  Stack,
} from '@mui/joy'
import { Toolbar } from '@components/layout'
import { usePfas } from '@views/pfas'
import {
  ChemicalDetectionPieChart,
  ChemicalsByMediumRadarChart,
} from '@components/charts'
import { ChartCard } from '@components/chart-card'

//

export const ChartsView = () => {
  const { table } = usePfas()

  return (
    <Stack direction="column">
      <Toolbar>{''}</Toolbar>

      <Grid container sx={{ mb: 2, gridGap: 24 }}>
        <Grid xs={ 12 } sm={ 11 } md={ 11 } lg={ 5.5 } xl={ 5.5 }>
          <ChartCard title="Detection Counts">
            <ChemicalDetectionPieChart data={ table.getPrePaginationRowModel().rows } />
          </ChartCard>
        </Grid>
        <Grid xs={ 12 } sm={ 11 } md={ 11 } lg={ 5.5 } xl={ 5.5 }>
          <ChartCard title="Detection Counts by Medium">
            <ChemicalsByMediumRadarChart data={ table.getPrePaginationRowModel().rows } />
          </ChartCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

