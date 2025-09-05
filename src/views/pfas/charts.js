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
  const { table } = usePfas();
  const { rows } = table.getPrePaginationRowModel();

  return (
    <Stack direction="column">
      <Toolbar>{''}</Toolbar>

      <Grid container spacing={ 2 } sx={{ maxWidth: 'calc(100vw - 2 * var(--joy-spacing))' }}>
        <Grid xs={ 12 } sm={ 12 } md={ 6 }>
          <ChartCard title="Detection Counts">
            <ChemicalDetectionPieChart data={ rows } />
          </ChartCard>
        </Grid>
        <Grid xs={ 12 } sm={ 12 } md={ 6 }>
          <ChartCard title="Detection Counts by Medium">
            <ChemicalsByMediumRadarChart data={ rows } />
          </ChartCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

