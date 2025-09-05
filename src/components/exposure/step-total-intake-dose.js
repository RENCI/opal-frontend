import { useMemo } from 'react';
import { Divider, Stack, Typography } from '@mui/joy';
import { useExposureForm } from './';

export const TotalIntakeDoseStep = () => {
  const { analytes, media } = useExposureForm();

  const isBelowThreshold = useMemo(() => {
    return media.totalIntakeDose < media.rfdThreshold
  }, [media.rfdThreshold, media.totalIntakeDose])

  return (
    <Stack direction="column" spacing={ 2 }>
      <Typography level="h2">Total Intake Dose</Typography>
      <Divider />

      <Typography>
        The total intake dose represents the combined exposure across all selected environmental media, 
        based on the intake rates and body weight you entered in previous steps. 
        This value provides an overall estimate of potential daily exposure to 
        <strong>{ analytes.selected.abbreviation }</strong>.
      </Typography>

      <Typography>
        The calculated total intake dose is shown below, along with a comparison to the 
        Reference Dose (RfD) threshold. This helps assess whether the estimated exposure 
        remains within a range generally considered safe over a lifetime.
      </Typography>

      <Typography>
        Total Intake Dose: <Typography variant="soft">{ media.totalIntakeDose }</Typography>
      </Typography>

      {
       <Typography>
          { isBelowThreshold ? 'Smaller than' : 'Not smaller than' } 80% of RfD Threshold,{' '}
          <Typography variant="soft">{ media.rfdThreshold }</Typography>.
        </Typography>
      }
    </Stack>
  );
};
