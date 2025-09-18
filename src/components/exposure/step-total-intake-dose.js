import { useMemo } from 'react';
import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/joy';
import { useExposureForm } from './';
import { Latex } from '@components/latex';

export const TotalIntakeDoseStep = () => {
  const { analytes, media, rfd } = useExposureForm();

  const isBelowThreshold = useMemo(() => {
    return media.totalIntakeDose < media.rfdThreshold
  }, [media.rfdThreshold, media.totalIntakeDose])

  return (
    <Stack direction="column" spacing={ 2 }>
      <Typography level="h3">Total Intake Dose</Typography>

      <Typography>
        The Total Intake Dose represents the combined exposure across all selected
        environmental media, based on the intake rates and body weight you entered
        in previous steps. This value provides an overall estimate of potential daily
        exposure to <strong>{ analytes.selected.abbreviation }</strong>.
      </Typography>

      <Typography>
        Used in our final calculation, this value helps assess whether the estimated exposure
        remains within a range generally considered safe over a lifetime.
        Review the calculated Total Intake Dose here, along with how it compares to the Reference Dose (RfD).
      </Typography>

      <Card variant="outlined" sx={{ width: '100%', maxWidth: '600px', alignSelf: 'center' }}>
        <CardContent>
          <Typography>
            <Typography fontWeight="bold">RfD:</Typography>{' '}
            <Typography variant="soft" fontFamily="monospace">{ rfd.current }</Typography>
          </Typography>

          <Divider />

          <Typography>
            <Typography fontWeight="bold">80% of RfD:</Typography>{' '}
            <Typography variant="soft" fontFamily="monospace">{ media.rfdThreshold }</Typography>
          </Typography>

          <Divider />

          <Typography>
            <Typography fontWeight="bold">Total Intake Dose:</Typography>{' '}
            <Typography variant="soft" fontFamily="monospace">{ media.totalIntakeDose }</Typography>
          </Typography>

          <Divider />

          <Stack direction="row" justifyContent="center" gap={ 2 } p={ 2 }>
            <Typography fontWeight="bold">Total Intake Dose</Typography>
            <Latex>{ isBelowThreshold ? '\\lt' : '\\not \\lt' }</Latex>
            <Typography fontWeight="bold">80% of RfD</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
