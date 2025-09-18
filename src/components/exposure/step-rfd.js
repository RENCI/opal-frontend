import {
  Button,
  Stack,
  Typography,
} from '@mui/joy';
import { NumberInput } from '@components/form';
import { useExposureForm } from '.';

export const ReferenceDoseStep = () => {
  const { analytes, rfd, avgBodyWeight } = useExposureForm();

  return (
    <Stack direction="column" spacing={ 2 }>
      <Typography level="h4">Reference Doses</Typography>
      <Typography level="body-sm">
        Reference Dose (RfD) values represent the estimated daily exposure to a substance considered safe over a lifetime.
        Enter the RfD values for <strong>{ analytes.selected.abbreviation }</strong> in <em>mg/kg/day</em>.
        Default values are provided and may be adjusted as needed.
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-end"
        gap={ 2 }
      >
        <NumberInput
          name={ `RfD Value for ${ analytes.selected.abbreviation }` }
          label={
            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
              <Typography size="body-xs">RfD Value for { analytes.selected.abbreviation }</Typography>
              {
                analytes.selected.rfd && (
                  <Button
                    onClick={ () => rfd.set(analytes.selected.rfd) }
                    variant="plain"
                    size="xs"
                    disabled={ rfd.current === analytes.selected.rfd }
                  >Use preset RfD for { analytes.selected.abbreviation }</Button>
                )
              }
            </Stack>
          }
          value={ rfd.current }
          setValue={ rfd.set }
          inputProps={{ endDecorator: 'mg/kg/day' }}
        />
        <NumberInput
          name="Target Group Average Body Weight"
          label="Target Group Average Body Weight"
          value={ avgBodyWeight.current }
          setValue={ avgBodyWeight.set }
          inputProps={{ endDecorator: 'kg' }}
        />
      </Stack>
    </Stack>
  );
};
