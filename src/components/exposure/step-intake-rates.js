import {
  Stack,
  Typography,
} from '@mui/joy';

import { useExposureForm } from '.';
import { capitalize } from '@util';

import { NumberInput } from '@components/form';
import { MediumIcon } from '@components/medium-icon';

const mediumIntakeRates = {
  water: 'L/day',
  dust: 'g/day',
  blood: 'mL/day', // could also be mL/kg/day?
};

export const IntakeRatesStep = () => {
  const { analytes, media } = useExposureForm();

  return (
    <Stack direction="column" gap={ 2 }>
      <Typography level="h4">Intake Rates</Typography>
      <Typography level="body-sm">
        Intake rates represent the average amount of a substance taken in from each environmental medium. 
        These values are integral to the exposure calculation. Please enter the intake rate for each medium 
        where <strong>{ analytes.selected.abbreviation }</strong> is present. Use appropriate units 
        (e.g., <em>mg/kg/day</em> or <em>L/day</em>), depending on the medium.
        Default values are provided and can be adjusted as needed.
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={ 2 }
      >
        {
          media.current.map(medium => (
            <Stack key={ `medium-${ medium }-intake-rate` } direction="row" sx={{ flex: 1 }}>
              <NumberInput
                name={ capitalize(medium) }
                label={
                  <Typography startDecorator={ <MediumIcon medium={ medium } /> }>Intake Rate for { capitalize(medium) }</Typography>
                }
                value={ media.intakeRates.current[medium] }
                setValue={ newValue => media.intakeRates.set(medium, newValue) }
                inputProps={{
                  endDecorator: mediumIntakeRates[medium] || '',
                }}
              />
            </Stack>
          ))
        }
      </Stack>
    </Stack>
  );
};
