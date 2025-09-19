import {
  Button,
  Stack,
  Typography,
} from '@mui/joy';
import { useExposureForm } from './';

export const CalculationMethodStep = () => {
  const { analytes, calculationMethod } = useExposureForm();

  return (
    <Stack spacing={ 2 }>
      <Typography level="h3">Relevant Regulatory Actions</Typography>

      <Typography>
        Choose the calculation method to apply in the exposure estimate. 
        This choice depends on whether regulatory actions or guidance exist 
        for the chemical under consideration, and how you want to represent 
        related uncertainties or decision-making factors.
      </Typography>

      <Typography>
        If there is at least one regulatory action (<em>e.g.</em>, criteria, standard, guidance) 
        relevant for <strong>{ analytes.selected.abbreviation }</strong>, select 
        <em>Percentage</em>. Otherwise, select <em> Subtraction</em>. 
        This step ensures the calculation reflects the most appropriate 
        risk management context.
      </Typography>

      <Stack
        direction="row"
        spacing={ 2 }
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt="3rem"
      >
        <Button
          variant={ calculationMethod.current === 'percentage' ? 'solid' : 'soft' }
          onClick={ () => calculationMethod.set('percentage') }
        >Percentage</Button>
        <Button
          variant={ calculationMethod.current === 'subtraction' ? 'solid' : 'soft' }
          onClick={ () => calculationMethod.set('subtraction') }
        >Subtraction</Button>
      </Stack>
    </Stack>
  );
};
