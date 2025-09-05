import {
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/joy';
import { NumberInput } from '@components/form';
import { useExposureForm } from '.';

export const ReferenceDoseStep = () => {
  const { analytes, rfd, avgBodyWeight } = useExposureForm();

  return (
    <Stack direction="column" spacing={ 2 }>
      <Typography level="h2">Reference Doses</Typography>
      <Divider />

      <Typography>
        Reference Dose (RfD) values represent the estimated daily exposure to a substance considered safe over a lifetime.
        Enter the RfD values for <strong>{ analytes.selected.abbreviation }</strong> in <em>mg/kg/day</em>.
        Default values are provided and may be adjusted as needed.
      </Typography>
      <NumberInput
        name={ `RfD Value for ${ analytes.selected.abbreviation }` }
        label={ `RfD Value for ${ analytes.selected.abbreviation }` }
        value={ rfd.current }
        setValue={ rfd.set }
        inputProps={{ endDecorator: 'mg/kg/day' }}
      />
      {
        analytes.selected.rfd && (
          <Button
            onClick={ () => rfd.set(analytes.selected.rfd) }
            variant="plain"
            size="sm"
            disabled={ rfd.current === analytes.selected.rfd }
          >Use preset RfD for { analytes.selected.abbreviation }</Button>
        )
      }
      <NumberInput
        name="Average Body Weight"
        label="Average Body Weight &mdash; Target Group"
        value={ avgBodyWeight.current }
        setValue={ avgBodyWeight.set }
        inputProps={{ endDecorator: 'kg' }}
      />
    </Stack>
  );
};
