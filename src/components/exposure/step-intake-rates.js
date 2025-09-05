import {
  Divider,
  Stack,
  Typography,
} from '@mui/joy';
import { NumberInput } from '@components/form';
import { useExposureForm } from '.';
import { capitalize } from '@util';

const mediumIntakeRates = {
  water: 'L/day',
  dust: 'g/day',
  blood: 'mL/day', // could also be mL/kg/day?
};

export const IntakeRatesStep = () => {
  const { analytes, media } = useExposureForm();

  return (
    <Stack direction="column" spacing={ 2 }>
      <Typography level="h2">Medium Intake Rates</Typography>
      <Divider />

      <Typography>
        Intake rates represent the average amount of a substance taken in from each environmental medium. 
        These values are integral to the exposure calculation. Please enter the intake rate for each medium 
        where <strong>{ analytes.selected.abbreviation }</strong> is present. Use appropriate units 
        (e.g., <em>mg/kg/day</em> or <em>L/day</em>), depending on the medium.
        Default values are provided and can be adjusted as needed.
      </Typography>

      {
        media.current.map(medium => (
          <NumberInput
            key={ `medium-${ medium }-intake-rate` }
            name={ capitalize(medium) }
            label={ `Intake Rate for ${ capitalize(medium) }` }
            value={ media.intakeRates.current[medium] }
            setValue={ newValue => media.intakeRates.set(medium, newValue) }
            inputProps={{ endDecorator: mediumIntakeRates[medium] || '' }}
          />
        ))
      }
    </Stack>
  );
};
